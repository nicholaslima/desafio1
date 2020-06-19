const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (request, response) => {

    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const project = request.body;

    const id = uuid();
    project.id = id;
    project.likes = 0;

    repositories.push(project);

    return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
   const { id }  = request.params;
   const { title,url,techs } = request.body;

   const idEncontrado = repositories.findIndex(item => item.id === id);

    if(idEncontrado < 0){
      return response.status('400').json({ "mensagem": "usaurio não encontrado"});
    }

    const project = {
      title,
      url,
      techs,
      id,
      likes: repositories[idEncontrado].likes
    }

    repositories[idEncontrado] = project;

   return response.json(project);
});

app.delete("/repositories/:id", async (request, response) => {
  const { id } = request.params;

  const idEncontrado = repositories.findIndex(item => item.id === id);

  if(idEncontrado < 0){
    return response.status('400').json({ "mensagem": "usuario não encontrado"});
  }

  await repositories.splice(idEncontrado,1);

  return response.status('204').json(repositories[idEncontrado]);

});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    const idEncontrado = repositories.findIndex(item => item.id === id);

    if(idEncontrado < 0){
      return response.status('400').json({ "mensagem": "usuario não encontrado"});
    }

    
    repositories[idEncontrado].likes++;

    return response.json(repositories[idEncontrado]);
});

module.exports = app;
