import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProdutosEditar extends Component {
    constructor(props){
        super(props)
        this.handleEditProduto = this.handleEditProduto.bind(this)
        this.state = {
            redirect: ''
        }
    }
    componentDidMount() {
        this.props.readProduto(this.props.match.params.id)
            .then(res => {
                this.refs.produto.value = res.data.produto
                this.refs.categoria.value = res.data.categoria
            })
    }
handleEditProduto(){
    const produto = {
        id: this.props.match.params.id,
        produto: this.refs.produto.value,
        categoria: this.refs.categoria.value
    }
    this.props.editProduto(produto)
        .then(()=> this.setState({ redirect: '/produtos/categoria/'+produto.categoria}))
    //console.log(produto)

}
 render() {
     const { categorias } = this.props
     if(this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }

     return (<div>
        <h2>Editar Novo</h2>
        <select ref='categoria'>
            {categorias
                .map((c) => <option key={c.id} value={c.id}>{c.categoria}</option>)
            }
        </select>
        <input
            placeholder='Nome do produto'
            className='form-control'
            ref='produto' >
        </input>
        <button onClick={this.handleEditProduto} >Salvar</button>
    </div>
)
 }   
}

export default ProdutosEditar
