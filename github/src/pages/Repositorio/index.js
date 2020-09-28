import React, {useState, useEffect} from 'react';
import {Container, Owner, Loading, IssuesList, BackButton, PagesActions, FilterList} from './styles';
import {FaArrowLeft} from 'react-icons/fa'
import api from '../../pages/Services/api';

   
export default function Data({match}){
    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filterIndex, seFilterIndex] = useState(0)
      
    const [filters, setFilters] = useState([
  
        {state: 'all', label: 'Todas', active:  true},
        {state: 'open', label: 'Aberta', active: false},
        {state: 'closed', label: 'Fechada', active: false}
    ]);
    
    useEffect(() =>{

        async function load(){

            const nomeRepo = decodeURIComponent(match.params.repositorio) 
            
            const [repositorioData, DataIssues ] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`,{
                    params:{
                        state: filters.find(f=> f.active).state,
                        per_page: 5,
                    },
                })

            ]);
        
            setRepositorio(repositorioData.data);
            setIssues(DataIssues.data);
            setLoading(false);
        }

        load();
    }, [match.params.repositorio])
    
    
    useEffect(()=>{
      
        async function loadIssues(){
            const nomeRepo = decodeURIComponent(match.params.repositorio) ;

            const response = await api.get( `/repos/${nomeRepo}/issues`,{
                params:{
                    state: filters[filterIndex].state,
                    page,
                    per_page: 5,
                }
            });

            setIssues(response.data)
           
        }
        
        loadIssues();
        
    }, [filters, filterIndex, match.params.repositorio , page]);


    
   
    function handlePage(action){
        
        setPage(action === 'back' ? page - 1 : page + 1)
        
    }

    function handleFilter(index){
        seFilterIndex(index);   
    }
 

    if(loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        );
    }
    return(
            <Container>
               <BackButton to="/">
                    <FaArrowLeft color="#000" size={30}/>
               </BackButton>
            
               

               <Owner>
                    <img src={repositorio.owner.avatar_url} 
                    alt={repositorio.owner.loguin}/>
                    <h1>{repositorio.name}</h1>
                    <p>{repositorio.description}</p>
               </Owner> 

               <FilterList active={filterIndex}>
                   
                   {filters.map((filter, index )=>(
                       <button
                        type="button" 
                       key={filter.label}
                       onClick={()=> handleFilter(index)}>
                           {filter.label}
                       </button>
                   ))
                       //index == position
                   }
                  </FilterList> 

               <IssuesList>
                    {issues.map(issue =>(
                       <li key={String(issue.id)}> 
                            <img src={issue.user.avatar_url}
                            alt={issue.user.loguin}/>

                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label =>(
                                        
                                        <span key={String(label.id)}>{label.name}</span>
                                   
                                   ))}
                                
                                </strong>

                                {issue.user.loguin}
                            </div>
                       
                       </li> 
                    ))}
               </IssuesList>

               <PagesActions>
                    
                    <button 
                    type="button" 
                    onClick={()=> handlePage('back')}
                    disabled={page < 2}>Voltar 
                    </button>
                    <button type="button" onClick={()=> handlePage('next')}>Proximo</button>
                  
               </PagesActions>
            </Container>
    );
}

/*

*/ 