import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const groups = [
  {
    dir: "assets/projects",
    exts: new Set([".png", ".jpg", ".jpeg"]),
    maxWidth: 1600,
    quality: 78,
  },
  {
    dir: "assets/certificates",
    exts: new Set([".gif", ".png", ".jpg", ".jpeg"]),
    maxWidth: 1800,
    quality: 80,
  },
  {
    dir: "assets/skills",
    exts: new Set([".png", ".jpg", ".jpeg"]),
    maxWidth: 512,
    quality: 84,
  },
  {
    dir: "assets/about",
    exts: new Set([".png", ".jpg", ".jpeg"]),
    maxWidth: 1100,
    quality: 82,
  },
];

const toKb = (bytes) => Number((bytes / 1024).toFixed(1));

const optimizeFile = async ({ inputPath, outputPath, maxWidth, quality }) => {
  const metadata = await sharp(inputPath, { animated: true }).metadata();
  const width =
    typeof metadata.width === "number" && metadata.width > 0 ? metadata.width : maxWidth;

  const pipeline = sharp(inputPath)
    .rotate()
    .resize({
      width: Math.min(width, maxWidth),
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({
      quality,
      effort: 6,
      alphaQuality: 90,
      smartSubsample: true,
    });

  await pipeline.toFile(outputPath);

  const [before, after] = await Promise.all([fs.stat(inputPath), fs.stat(outputPath)]);

  return {
    inputPath,
    outputPath,
    before: before.size,
    after: after.size,
  };
};

const run = async () => {
  const results = [];

  for (const group of groups) {
    const dirPath = path.resolve(group.dir);
    const files = await fs.readdir(dirPath, { withFileTypes: true });

    for (const file of files) {
      if (!file.isFile()) {
        continue;
      }

      const ext = path.extname(file.name).toLowerCase();
      if (!group.exts.has(ext)) {
        continue;
      }

      const inputPath = path.join(dirPath, file.name);
      const outputPath = path.join(dirPath, `${path.basename(file.name, ext)}.webp`);
      const item = await optimizeFile({
        inputPath,
        outputPath,
        maxWidth: group.maxWidth,
        quality: group.quality,
      });
      results.push(item);
    }
  }

  const totalBefore = results.reduce((sum, item) => sum + item.before, 0);
  const totalAfter = results.reduce((sum, item) => sum + item.after, 0);
  const saved = totalBefore - totalAfter;
  const savedPercent = totalBefore > 0 ? ((saved / totalBefore) * 100).toFixed(1) : "0.0";

  for (const item of results) {
    console.log(
      `${path.relative(process.cwd(), item.inputPath)} -> ${path.relative(
        process.cwd(),
        item.outputPath
      )} | ${toKb(item.before)} KB -> ${toKb(item.after)} KB`
    );
  }

  console.log("");
  console.log(
    `Total: ${toKb(totalBefore)} KB -> ${toKb(totalAfter)} KB (saved ${toKb(saved)} KB, ${savedPercent}%)`
  );
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
