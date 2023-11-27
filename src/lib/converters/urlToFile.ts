export function srcToFile(src: string, fileName: string, mimeType: string) {
    return (fetch(src)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], fileName, { type: mimeType }); })
    );
}