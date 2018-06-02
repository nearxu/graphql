var author = "andy";
var content = "hope is a good thing";
var xhr = new XMLHttpRequest();
xhr.responseType = "json";
xhr.open("POST", "/graphql");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.onload = function() {
  console.log("data returned:", xhr.response);
};
var query = `mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id
  }
}`;
xhr.send(
  JSON.stringify({
    query: query,
    variables: {
      input: {
        author: author,
        content: content
      }
    }
  })
);
