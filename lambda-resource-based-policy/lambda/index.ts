const handler = async function (event: any, _context: any) {
    console.log("lambda executing");
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/json" },
        body: "hello from Lambda"

    }
}
module.exports = {handler};