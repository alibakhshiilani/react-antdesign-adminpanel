import xml2js from "xml2js";

export const xmlToJsonFunction = (message: any) => {
  let xmlData: any;
  const parser = new xml2js.Parser();
  // @ts-ignore
  parser.parseString(message, (err: any, result: any) => {
    xmlData = result;
  });

  // @ts-ignore
  return JSON.parse(xmlData.message.body[0]);
};
