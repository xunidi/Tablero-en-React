import React from 'react';
import styles from './App.module.scss';
import Input from './components/Input/Input';
import Board from './Board/Board';
import Button from './components/Button/Button';
import produce from 'immer/dist/immer';

class App extends React.PureComponent {
	state = {
		cities: {
			items: [],
			index: 0,
			input:''
		},
		drinks: {
			items: [],
			index: 0,
			input:''
		},
		friends: {
			items: [],
			index: 0,
			input:''
		}
		
	};

	onHandleButton = (object) => {
		const nextState = produce(this.state, (draft) => {
			if (draft[object].items.length > draft[object].index + 1) draft[object].index = draft[object].index + 1;
			else draft[object].index = 0;
		});
		this.setState(nextState);
	};

	onAddButtonClick = (object) => {
		const nextState = produce(this.state, (draft) => {
			draft[object].items = draft[object].items.concat(draft[object].input);
			console.log('input antes',draft[object].input);
			draft[object].input = '';
			console.log('input ahora',draft[object].input);
		});
		this.setState(nextState);
	};

	onDeleteButtonClick = (object) => {
		const nextState = produce(this.state, (draft) => {
			draft[object].items.splice(draft[object].input-1, 1);
		});
		this.setState(nextState);
	};

	onInputChange = (event,object) => {
		const  value = event.target.value;
		console.log('TCL: App -> onInputChange -> value', value);
		const nextState = produce(this.state, (draft) => {
			draft[object].input = value;
		});
		this.setState(nextState);
	};

	render() {
		const { cities, drinks, friends } = this.state;
		return (
			<div>
				<p className={styles.title}>¡Bienvenidos al curso de programación de cómputo móvil!</p>
				<div className={styles.container_boards}>
					<div className={styles.container_add}>
						<Input value={cities.input} name="ciudades" onChange={(event) => this.onInputChange(event,'cities')} />
						<Button label={'+'} onClick={(input) => this.onAddButtonClick('cities')} />
						<Button label={'-'} onClick={() => this.onDeleteButtonClick('cities')} />
						<label>Ciudades tiene:{cities.items.length} registros</label>
					</div>

					<div className={styles.container_add}>
						<Input value={drinks.input} name="bebidas" onChange={(event) => this.onInputChange(event,'drinks')} />
						<Button label={'+'} onClick={() => this.onAddButtonClick('drinks')} />
						<Button label={'-'} onClick={() => this.onDeleteButtonClick('drinks')} />
						<label>Bebidas tiene:{drinks.items.length} registros</label>
					</div>

					<div className={styles.container_add}>
						<Input value={friends.input} name="amigos" onChange={(event) => this.onInputChange(event,'friends')} />
						<Button label={'+'} onClick={() => this.onAddButtonClick('friends')} />
						<Button label={'-'} onClick={() => this.onDeleteButtonClick('friends')} />
						<label>Amigos tiene:{friends.items.length} registros</label>
					</div>
				</div>	
				<div className={styles.container_boards}>
					<label>Ciudades</label>
					<Board items={cities.items} index={cities.index} label={''} onButtonClick={() => this.onHandleButton('cities')} />
					<label>Bebidas</label>
					<Board items={drinks.items} index={drinks.index} label={''} onButtonClick={() => this.onHandleButton('drinks')} />
					<label>Amigos</label>
					<Board items={friends.items} index={friends.index} label={''} onButtonClick={() => this.onHandleButton('friends')} />
					
				</div>
			</div>
		);
	}
}

export default App;
