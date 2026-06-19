/**
 * Minimal Changesets changelog generator.
 *
 * This deliberately avoids GitHub API lookups so versioning stays reliable in CI.
 */
module.exports = {
  async getReleaseLine(changeset) {
    const [firstLine, ...otherLines] = changeset.summary
      .split("\n")
      .map((line) => line.trimEnd());

    return [
      `- ${firstLine}`,
      ...otherLines.map((line) => `  ${line}`),
    ].join("\n");
  },

  async getDependencyReleaseLine() {
    return "";
  },
};
