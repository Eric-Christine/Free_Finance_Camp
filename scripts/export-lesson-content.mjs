import { watch } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { curriculum } from '../src/data/curriculum.js';
import { quizzes } from '../src/data/quizzes.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUTPUT_PATH = resolve(ROOT, 'lesson-content-export.md');
const SOURCE_FILES = [
    resolve(ROOT, 'src', 'data', 'curriculum.js'),
    resolve(ROOT, 'src', 'data', 'quizzes.js')
];

function normalizeText(value) {
    if (value === null || value === undefined) {
        return '';
    }

    return String(value).trim();
}

function normalizeContentLines(content) {
    if (!Array.isArray(content)) {
        return [];
    }

    return content.flatMap((entry) => {
        if (Array.isArray(entry)) {
            return normalizeContentLines(entry);
        }

        if (entry === null || entry === undefined) {
            return [];
        }

        if (typeof entry === 'string') {
            return [entry];
        }

        if (typeof entry === 'number' || typeof entry === 'boolean') {
            return [String(entry)];
        }

        return [JSON.stringify(entry)];
    });
}

function pushParagraphBlock(lines, content) {
    const normalized = normalizeContentLines(content);
    for (const paragraph of normalized) {
        lines.push(paragraph);
    }

    if (normalized.length > 0 && lines[lines.length - 1] !== '') {
        lines.push('');
    }
}

function pushLessonBody(lines, lesson) {
    if (lesson.story) {
        lines.push('#### Story');
        lines.push(`Character: ${normalizeText(lesson.story.character)}`);
        lines.push(normalizeText(lesson.story.scenario));
        lines.push('');
    }

    if (Array.isArray(lesson.screens) && lesson.screens.length > 0) {
        lesson.screens.forEach((screen, index) => {
            const screenTitle = normalizeText(screen.title) || `Screen ${index + 1}`;
            lines.push(`#### Screen ${index + 1}: ${screenTitle}`);
            pushParagraphBlock(lines, screen.content);
        });
    } else {
        lines.push('#### Content');
        pushParagraphBlock(lines, lesson.content);
    }
}

function pushLessonQuiz(lines, lessonId) {
    const lessonQuiz = quizzes[lessonId];
    if (!Array.isArray(lessonQuiz) || lessonQuiz.length === 0) {
        return;
    }

    lines.push('#### Quiz');

    lessonQuiz.forEach((quizItem, questionIndex) => {
        lines.push(`${questionIndex + 1}. ${normalizeText(quizItem.question)}`);

        if (Array.isArray(quizItem.options)) {
            quizItem.options.forEach((option, optionIndex) => {
                const optionLabel = String.fromCharCode(65 + optionIndex);
                const isCorrect = optionIndex === quizItem.correctIndex;
                const correctSuffix = isCorrect ? ' [Correct]' : '';
                lines.push(`   - ${optionLabel}. ${normalizeText(option)}${correctSuffix}`);
            });
        }

        lines.push('');
    });
}

function buildMarkdown() {
    const generatedAt = new Date().toISOString();
    const output = [];

    output.push('# Free Finance Camp Lesson Content Export');
    output.push('');
    output.push('Auto-generated from `src/data/curriculum.js` and `src/data/quizzes.js`.');
    output.push(`Generated at: ${generatedAt}`);
    output.push('');
    output.push('Use this file to copy lesson material into Word and edit.');
    output.push('');

    let lessonCount = 0;

    curriculum.forEach((module, moduleIndex) => {
        output.push(`## Module ${moduleIndex + 1}: ${normalizeText(module.title)}`);
        output.push(`Module ID: \`${normalizeText(module.id)}\``);
        output.push(`Description: ${normalizeText(module.description)}`);
        output.push('');

        module.lessons.forEach((lesson, lessonIndex) => {
            lessonCount += 1;
            output.push(`### Lesson ${lessonIndex + 1}: ${normalizeText(lesson.title)}`);
            output.push(`Lesson ID: \`${normalizeText(lesson.id)}\``);
            output.push(`Type: ${normalizeText(lesson.type) || 'reading'}`);
            output.push(`XP Reward: ${normalizeText(lesson.xpReward) || 'N/A'}`);
            output.push(`Description: ${normalizeText(lesson.description)}`);
            output.push('');

            pushLessonBody(output, lesson);
            pushLessonQuiz(output, lesson.id);
            output.push('---');
            output.push('');
        });
    });

    return {
        markdown: output.join('\n').trimEnd() + '\n',
        moduleCount: curriculum.length,
        lessonCount
    };
}

async function generateExport() {
    const { markdown, moduleCount, lessonCount } = buildMarkdown();
    await writeFile(OUTPUT_PATH, markdown, 'utf8');
    console.log(`Updated ${OUTPUT_PATH} (${moduleCount} modules, ${lessonCount} lessons)`);
}

function startWatchMode() {
    const watchers = [];
    let timer = null;
    let generating = false;
    let queued = false;

    const runGenerate = async () => {
        if (generating) {
            queued = true;
            return;
        }

        generating = true;
        try {
            await generateExport();
        } catch (error) {
            console.error('Lesson export failed:', error);
        } finally {
            generating = false;
            if (queued) {
                queued = false;
                await runGenerate();
            }
        }
    };

    const scheduleGenerate = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            void runGenerate();
        }, 150);
    };

    for (const sourceFile of SOURCE_FILES) {
        const watcher = watch(sourceFile, { persistent: true }, () => {
            scheduleGenerate();
        });
        watchers.push(watcher);
    }

    const cleanup = () => {
        clearTimeout(timer);
        watchers.forEach((watcher) => watcher.close());
        process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

    console.log(`Watching lesson sources for changes:
- ${SOURCE_FILES[0]}
- ${SOURCE_FILES[1]}`);
}

const watchMode = process.argv.includes('--watch');

if (watchMode) {
    await generateExport();
    startWatchMode();
} else {
    await generateExport();
}
