
set -e

mongo <<EOF
use $MONGO_INITDB_DATABASE

db.createUser({
    user: '$MONGO_INITDB_USER',
    pwd: '$MONGO_INITDB_PWD',
    roles: [{
        role: 'readWrite',
        db: '$MONGO_INITDB_DATABASE'
    }]
})

db.createCollection('questions',{capped: false})

db.questions.insert({
    formID: 1,
    label: "Que te gustaria que agregaramos al informe?",
    inputType: "textArea"
})
db.questions.insert({
    formID: 1,
    label: "La informacion es correcta?",
    inputType: "radioButton",
    options: [{
        label: "SI",
        value: "SI",
    },{
        label: "NO",
        value: "NO",
    },{
        label: "Mas o menos ",
        value: "MOM",
    }]
})
db.questions.insert({
    formID: 1,
    label: "Del 1 a 5, que tan rapido es el sitio?",
    inputType: "radioButton",
    options: [{
        label: "1",
        value: "1",
    },{
        label: "2",
        value: "2",
    },{
        label: "3",
        value: "3",
    },{
        label: "4",
        value: "4",
    },{
        label: "5",
        value: "5",
    }]
    })
EOF