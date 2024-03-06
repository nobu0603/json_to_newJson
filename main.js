const fs = require("fs").promises;

async function updateSampleFiles() {
  try {
    // sample_01.jsonを読み込む
    const sample01Data = await fs.readFile("sample_01.json", "utf8");
    const sample01 = JSON.parse(sample01Data);
    const sample01Objects = sample01.data; // "data"キーにアクセス

    // sample_idが"1"または"2"のオブジェクトをフィルタリングする
    const filteredObjects = sample01Objects.filter(
      (obj) => obj.sample_id === "1" || obj.sample_id === "2"
    );

    // sample_02.jsonに保存するためのオブジェクトを生成する
    // この際、idを連番で割り当てる
    const newObjectsForSample02 = {
      file_name: "sample_02.json",
      data: filteredObjects.map((obj, index) => {
        return {
          id: index + 1, // 連番のidを割り当て
          section_id: obj.section_id,
          source_path: obj.source_path,
          created_by: obj.created_by,
        };
      }),
    };

    // 新しいオブジェクトをsample_02.jsonに保存する
    await fs.writeFile(
      "sample_02.json",
      JSON.stringify(newObjectsForSample02, null, 2),
      "utf8"
    );

    console.log("sample_02.json has been updated successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

updateSampleFiles();
