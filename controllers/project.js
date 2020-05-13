'use strict'

var Project = require("../models/project");

var controller = {
    home: function(req , res){
        return res.status(200).send({
            message: "Soy la Home"
        });
    },
    test: function(req,res){
        return res.status(200).send({
            message: "Soy el metodo o accion test del controlador de project"
        });
    },


    // Funcion para guardar datos en la BD
    saveProject: function(req,res){
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) =>{
            if(err) return res.status(500).send({message: "Error al guardar el documento"});
            if(!projectStored) return res.status(404).send({message: "No se a podido guardar el proyecto"});
            return res.status(200).send({project:projectStored});
        });
    },

    // Funcion para obtener y buscar datos de la BD
    getProject: function(req,res){
        var projectId = req.params.id;

            if (projectId == null) return res.status(404).send({message: 'El proyeco no existe'});
        // El findById sirve para buscar por el id de alguna coleccion y me traiga los datos
        Project.findById(projectId, (err,project) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!project) return res.status(404).send({message: 'El proyeco no existe'});
            return res.status(200).send({project});
        });
    },

    // Funcion para obtener varias colecciones de la BD
    getProjects: function(req,res){

        // dentro de find se puede buscar los datos como si fuera un where "year:2020"
        // tambien se pueden ordenar los datos con el comando sort() y dentro del parentesis el campo por que el que quiero ordenas
        Project.find({}).sort('-year').exec((err,projects) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if( !projects) return res.status(404).send({message: 'No hay proyectos que mostrar'});
            return res.status(200).send({projects});
        });
    },

    // Actualizar una coleccion de la BD
    updateProject: function(req,res){

        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId,update,{new:true},(err, projectUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar'});
            if( !projectUpdated) return res.status(404).send({message: 'No hay proyectos para actualizar'});
            return res.status(200).send({project: projectUpdated});
        });
    },

    deleteProject: function(req,res){
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err,projectRemoved) =>{
            if(err) return res.status(500).send({message: 'No se a podido borrar el proyecto'});
            if( !projectUpdated) return res.status(404).send({message: 'No se puede eliminar ese proyectoi'});
            return res.status(200).send({project: projectRemoved});          
        });
    }
};

module.exports = controller;