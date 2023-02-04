import https from "https";

export default function (url: string) {
  return new Promise<any>((resolve, reject) => {
    https
      .get(url, (result) => {
        result.setEncoding("utf-8");
        let body = "";
        result.on("data", (chunk) => (body += chunk));
        result.on("end", () => resolve(JSON.parse(body)));
      })
      .on("error", reject);
  });
}
