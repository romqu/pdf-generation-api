import { Lifecycle, Request, ResponseToolkit } from "hapi";
import { Stream } from "stream";

export async function downloadPdfHandler(
  _: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  const channel = new Stream.PassThrough();

  // setInterval(() => {
  //   channel.write("event: message\n");
  //   channel.write("data: abcdef " + "\n\n");
  //   console.log("write data...");
  // }, 1000);

  const TestStream = class extends Stream.Readable {
    public compressor: any;

    public _read(__: number): void {
      this.push("some");
      this.compressor.flush();

      return;
    }

    public setCompressor(compressor: any): void {
      this.compressor = compressor;
    }
  };

  return h.response(new TestStream()).type("text/html");

  // const stream = fs.createReadStream(
  //   "/home/roman/Downloads/annual_report_2009.pdf"
  // );

  // return h
  //   .response(stream)
  //   .type("application/pdf")
  //   .header("Content-type", "application/pdf")
  //   .header("Content-length", stream.readableLength.toString())
  //   .header("Content-Encoding", "none");
}
