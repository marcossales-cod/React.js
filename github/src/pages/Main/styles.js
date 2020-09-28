import styled, {keyframes, css} from 'styled-components';


export const Container = styled.div`
    width: 980px;
    max-widt: 700px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.2);
    padding: 30px;
    margin: 80px auto;

    h1{
        font-size: 20px;
        display: flex;
        alingn-items: center;
        flex-direction: row;
    
        svg{
            margin-right: 10px;
        }
    
    }

    
`;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input{
        flex: 1;
        border: 1px solid  ${props=>(props.error ? '#ff0000 ': '#ddd' )};
        padding: 10px 15px;
        border-radius: 3px ;
        font-size: 17px;
    }

`;

//criando animação

const animate = keyframes`
    from{
        transform:  rotate(0deg);

    }

    to{
        transform: rotate(360deg);
    }

    `;


//facebook/react
export const SubmitButton = styled.button.attrs(props =>({ 
   
    type: 'submit',
    disabled: props.loading,
   
}))`
    background: #0D2636;
    border: 0;
    border-radius: 3px;
    margin-left: 10px;
    padding: 0 15px;  
    display: flex;
    justify-content: center;
    align-items: center; 
    color: #fff;

    &[disabled]{
        cursor: not-allowed;
        opacity: 0.5;
     
    }

    ${ props=> props.loading && 
        css`

        svg{
            animation: ${animate} 2s linear infinite;
        }
      `
    }


`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        padding: 15px 0;
        display: flex;
        alingn-items: center;
        justify-content: space-between;
        
        & + li{
            border-top: 1px solid #eee  ;
        }
    
        a{
            color: #0D2636; 
            text-decoration: none;
        }
    }

`; 

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`

    background: transparent;
    color: #0D2636;
    border: 0;
    padding: 7px 8px;
    outline: 0;
    border-radius: 4px;
`;



