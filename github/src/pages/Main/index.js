import React, {useState, useCallback, useEffect } from 'react';
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import {Container, Form, SubmitButton, List, DeleteButton} from './styles';
import {Link} from 'react-router-dom';  
import api from '../Services/api';

export default function Main(){
  
  const [newRepo, setNewRepo] = useState('')
  const [repositorios, setRepositorios] = useState([])
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null)

//didmont = buscar  
useEffect(()=>{
  const repoStorange = localStorage.getItem('repos');
  if(repoStorange){
    setRepositorios(JSON.parse(repoStorange))
  }

},[])


//didupdate = salvar alterações
useEffect(()=>{
  localStorage.setItem('repos', JSON.stringify(repositorios))
}, [repositorios])



  const handleSubmit = useCallback((e)=>{
  
  e.preventDefault();

  async function submit(){
     
    setLoading(true);
    setAlert(null);

    try{
      if(newRepo === ' '){
        throw new Error('Você precisa listar um repositorio!')
      }
     
     
      const reponse = await api.get(`repos/${newRepo}`);
  
      const hasRepo = repositorios.find(repo=> repo.name === newRepo);  

      if(hasRepo){
        throw new Error('Esse repositorio ja existe!')
      }

      const data = {
        name: reponse.data.full_name,
      }
    
      setRepositorios([...repositorios, data]);
      setNewRepo('');
    }catch(error){
      setAlert(true);  
      console.log(`[ERRO]:  ${error}`);
      }finally{
        setLoading(false);
      }
      
    }

    submit();

 }, [newRepo, repositorios]);
  
  
  function handleinputChange(e){
    //onchange recebe evento

    setNewRepo(e.target.value);
    setAlert(null);
  }


  const handleName = useCallback((repo) =>{
    const find = repositorios.filter(r => r.name !== repo);
    setRepositorios(find);

  }, [repositorios]) 

   return(
        <Container>
            
          <h1>
            <FaGithub size={25}/>
            Meus Repositórios!
          </h1>

            <Form onSubmit={handleSubmit} error={alert}>
            <input  type="text" 
            placeholder="Adicionar Repositorios"
            value={newRepo}
            onChange={handleinputChange}/>

            <SubmitButton Loading={loading ? 1 : 0}>
             {loading? (
               <FaSpinner color="#fff" size={14}/>
             ) : (
               <FaPlus colo="#FFF" size={14}/>
             )}
              
            </SubmitButton>


          </Form>
          <List>
            {
              repositorios.map(repo=>(
                  <li key={repo.name}>
                    <span>
                      <DeleteButton onClick={()=>handleName(repo.name)} >
                          <FaTrash size={14}/>
                      </DeleteButton>
                      {repo.name}
                    </span>
                    <Link to={`/repositorio/${encodeURIComponent(repo.name)}` }>
                      <FaBars size={20}/>
                    </Link>
                  </li>
              ))
            }
          </List>
          
          
        </Container>
    );
}