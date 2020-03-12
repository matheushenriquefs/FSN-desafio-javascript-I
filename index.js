// Base a ser utilizada
let alunosDaEscola=[
    {
        nome: "Henrique",
        notas: [],
        cursos: [],
        faltas: 5
    },
    {
        nome: "Edson",
        notas: [],
        cursos: [],
        faltas: 2
    },
    {
        nome: "Bruno",
        notas: [10, 9.8, 9.6],
        cursos: [],
        faltas: 0
    },
    {
        nome: "Guilherme",
        notas: [10, 9.8, 9.6],
        cursos: 
        [
            {
                nomeDoCurso: "Full Stack", 
                dataMatricula: new Date
            }
        ],
        faltas: 0
    },
    {
        nome: "Carlos",
        notas: [],
        cursos: [],
        faltas: 0
    },
    {
        nome: "Lucca",
        notas: [10, 9.8, 9.6],
        cursos: 
        [
            {
                nomeDoCurso: "UX", 
                dataMatricula: new Date
            }
        ],
        faltas: 0
    }
];

/*Essa função irá receber uma *string* que é nome do aluno a ser criado.
E seguindo o modelo de aluno, o mesmo deverá ser inserido na lista de alunos.
A função deve devolver um feedback de sucesso, caso o aluno seja inserido corretamente.*/

function adicionarAluno(nome){
    if(typeof nome === "string"){
        alunosDaEscola.push(
            {
                nome: nome,
                notas: [],
                cursos: [],
                faltas: 0
            }
        );
        console.log("Aluno cadastrado com sucesso.\n");
    }else{
        console.log("Falha no cadastro.");
    }
}

// adicionarAluno("Matheus");

/*Com essa função o usuário poderá ver todos os alunos cadastrados atualmente no sistema.
Vale dizer que As informações deverão ser exibidas em um formato amigável.*/

function listarAlunos(){
    console.log(`==========Alunos da Escola==========\n`);
    for(val of alunosDaEscola){
        console.log(`Nome: ${val.nome}`);
        if(val.cursos.length < 1){
            console.log(`Notas: N/A\nCursos: Não matrículado\nFaltas: N/A\n`);
        }else{
            console.log(`Notas: ${val.notas}`);
            console.log(`Cursos:`);
            for(val2 of val.cursos){
                if(typeof val2.nomeDoCurso && typeof val2.dataMatricula !== "undefined"){
                    console.log(`${val2.nomeDoCurso} - Matrícula: ${val2.dataMatricula}`);
                }
            }
            console.log(`Faltas: ${val.faltas}\n`);
        }
    }
    console.log(`====================================\n`);
}

// listarAlunos();

/*Por meio dessa função, podemos pesquisar um aluno por nome na lista de aluno.
Ela deverá exibir um feedback, tanto para quando encontrar o aluno, tanto quando não encontrar.
E deverá devolver um aluno em seu retorno. */

function buscarAluno(nome){
    let alunoEncontrado = alunosDaEscola.filter(el => el.nome.includes(nome));
    if(alunoEncontrado.length !== 0){
        listarAluno(alunoEncontrado, "Encontrado");
    }else{
        console.log("Aluno não encontrado.");
    }
}

// buscarAluno("Matheus");

/* Essa funcionalidade irá permitir, cadastrar um aluno em um curso. 
Essa função só poderá ser executada em um aluno já devidamente cadastrado no 
sistema, e deverá armazenar a data atual no momento da matricula. Lembre-se de
exibir o feedback para o usuário.*/

function matricularAluno(aluno, curso){
    let alunoIndex = verificaCadastro(aluno);
    if(alunoIndex === undefined){
        console.log("Aluno não cadastrado.");
    }else{
        alunosDaEscola[alunoIndex].cursos.push(
            {
                nomeDoCurso: curso,
                dataMatricula: new Date
            }
        );
        listarAluno([alunosDaEscola[alunoIndex]], "Matriculado");
        listarAlunos();
    }
}

// matricularAluno("Matheus", "FullStack");

/*Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá incrementar uma falta ao aluno.
Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar falta em aluno se o mesmo tiver matriculado em um curso.*/

function aplicarFalta(aluno){
    let alunoIndex = verificaCadastro(aluno);
    if(alunoIndex === undefined){
        console.log("Aluno não cadastrado.");
    }else{
        if(alunosDaEscola[alunoIndex].cursos.length < 1){
            console.log("Aluno não matriculado.");
        }else{
            alunosDaEscola[alunoIndex].faltas = alunosDaEscola[alunoIndex].faltas + 1;
            listarAluno([alunosDaEscola[alunoIndex]], "Adicionado Falta");
            listarAlunos();
        }
    }
}

// aplicarFalta("Matheus");

/*Ao receber um aluno devidamente cadastrado em nossa lista.
Você deverá adicionar uma nota ao aluno na sua lista de notas.
Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar nota em
aluno se o mesmo tiver matriculado em um curso.*/
    
function aplicarNota(aluno, arrayNotas){
    let alunoIndex = verificaCadastro(aluno);
    if(alunoIndex === undefined){
        console.log("Aluno não cadastrado.");
    }else{
        if(alunosDaEscola[alunoIndex].cursos.length < 1){
            console.log("Aluno não matriculado.");
        }else{
            for(val of arrayNotas){
                alunosDaEscola[alunoIndex].notas.push(val)
            }
            listarAluno([alunosDaEscola[alunoIndex]], "Adicionado Nota");
            listarAlunos();
        }
    }
}

// aplicarNota("Matheus", [10, 10, 10]);

/*Ao receber um aluno devidamente cadastrado em nossa lista, deverá dizer se
o mesmo está aprovado ou não. Os critérios de aprovação são: ter no máximo 3
faltas e média 7 em notas. Só o aluno só poderá ser aprovado se o mesmo tiver matriculado em um curso.*/

function aprovarAluno(aluno){
    let alunoIndex = verificaCadastro(aluno);
    if(alunoIndex === undefined){
        console.log("Aluno não cadastrado.");
    }else{
        if(alunosDaEscola[alunoIndex].cursos.length < 1){
            console.log("Aluno não matriculado.");
        }else{
            let totalNotas = 0;
            for(val of alunosDaEscola[alunoIndex].notas){
                totalNotas = totalNotas + val;
            }
            let mediaNotas = totalNotas / alunosDaEscola[alunoIndex].notas.length;
            if(alunosDaEscola[alunoIndex].faltas <= 3 && mediaNotas >= 7){
                listarAluno([alunosDaEscola[alunoIndex]], "Aprovado");
                listarAlunos();
            }else{
                listarAluno([alunosDaEscola[alunoIndex]], "Reprovado");
                listarAlunos();
            }
        }
    }
}

// aprovarAluno("Matheus");

/* FUNÇÕES PROPRIAS */

function listarAluno(arrayAluno, string){
    console.log(`==========Aluno ${string}==========\n`);
    for(val of arrayAluno){
        console.log(`Nome: ${val.nome}`);
        if(val.cursos.length < 1){
            console.log(`Notas: N/A\nCursos: Não matrículado\nFaltas: N/A\n`);
        }else{
            console.log(`Notas: ${val.notas}`);
            console.log(`Cursos:`);
            for(val2 of val.cursos){
                if(typeof val2.nomeDoCurso && typeof val2.dataMatricula !== "undefined"){
                    console.log(`${val2.nomeDoCurso} - Matrícula: ${val2.dataMatricula}`);
                }
            }
            console.log(`Faltas: ${val.faltas}\n`);
        }
    }
    console.log(`====================================\n`);
}

function verificaCadastro(aluno){
    let index = alunosDaEscola.findIndex(el => el.nome === aluno);
    if(index === -1){
        return undefined;
    }else{
        return index;
    }
}