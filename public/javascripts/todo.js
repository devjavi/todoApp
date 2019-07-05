//Toggle .completed class when clicking over a Li
$('ul').on('click', 'li', function() {
	$(this).toggleClass('completed');
});

// + sign functionality

$('#plusSign').click(() => {
	$('#newTodo').fadeToggle(200);
});
