'use strict';

const todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	headerBtn = document.querySelector('.header-button'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed');

	

let todoDta = [];

	todoDta = localStorage.getItem('todoDta') ? 
			  JSON.parse(localStorage.getItem('todoDta')) : [];


const render = function() {
	todoList.textContent = '';
	todoCompleted.textContent = '';

	todoDta.forEach(function(item) {
		const li = document.createElement('li');
		li.classList.add('todo-item');

		li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
		'<div class="todo-buttons">' + 
			'<button class="todo-remove"></button>' + 
			'<button class="todo-complete"></button>' + 
		'</div';
	
		if(item.complited) {
			todoCompleted.append(li);
		} else {
			todoList.append(li);
		}

		const btnTodocomplete = li.querySelector('.todo-complete');

			btnTodocomplete.addEventListener('click', function() {
			item.complited = !item.complited;
			
			setStrege();
			render();
		});
		removeListElement();
	});

	
};

setInterval(function() {
	if(headerInput.value === '') {
		headerBtn.disabled = true;
		headerBtn.style.opacity = '0.5';
	} else {
		headerBtn.disabled = false;
		headerBtn.style.opacity = '1';
	}
}, 1000);

todoControl.addEventListener('submit', function(event) {
	event.preventDefault();

	let newTodo = {
		value: headerInput.value,
		completed: false
	};

	todoDta.push(newTodo);

	setStrege();

	headerInput.value = '';
	render();
});


function removeListElement() {
	let BtnTodoRemove = document.querySelectorAll('.todo-remove');;
	BtnTodoRemove.forEach(function(item) {
		item.addEventListener('click', function() {

			let parentListItem = this.closest('li'); 
			let listItemText = parentListItem.querySelector('.text-todo').textContent;

			parentListItem.remove();
			todoDta.forEach(function(item) {
				if(item.value === listItemText) {
					todoDta.splice(item, 1);
					
				}
			});
			setStrege();
		});
	
	}); 
}


function setStrege() {
	localStorage.setItem('todoDta', JSON.stringify(todoDta));
}


render();

