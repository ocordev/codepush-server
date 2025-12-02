import fs from "fs";
import path from "path";
import {
  CliConfigInterface,
  ReleaseHistoryInterface,
} from "@bravemobile/react-native-code-push";

const Config: CliConfigInterface = {
  bundleUploader: async (source, platform, identifier) => {
    return {
      downloadUrl: `https://ocordev.github.io/codepush-server/bundles/${platform}/${identifier}/${source}`
    };
  },

  getReleaseHistory: async () => {
    return {};
  },

  setReleaseHistory: async (
    targetBinaryVersion,
    jsonFilePath,
    releaseInfo,
    platform,
    identifier
  ) => {
    // === GUARDA EL ARCHIVO EN /histories/android/staging/1.0.json ===
    const outputPath = path.join(
      process.cwd(),
      "histories",
      platform,
      identifier,
    );

    // Crear carpetas si no existen
    fs.mkdirSync(outputPath, { recursive: true });

    // Nombre final del archivo
    const finalFile = path.join(outputPath, `${targetBinaryVersion}.json`);

    // Copiar el JSON TEMPORAL generado por el CLI a tu carpeta final
    fs.copyFileSync(jsonFilePath, finalFile);

    console.log("✔ release history saved to", finalFile);
  }
};

module.exports = Config;
