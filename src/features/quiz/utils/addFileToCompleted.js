export function addFileToCompleted() {
	let idx = fileIndexHistory.recent.indexOf(fileIndex);
	if (idx == -1) idx = fileIndexHistory.main.indexOf(fileIndex);
	if (fileIndexHistory.recent.includes(fileIndex)) {
		fileIndexHistory.recent.splice(idx, 1);
	} else fileIndexHistory.main.splice(idx, 1);
	// fileHistory.recent.splice(idx, 1);
	settings.quiz?.complete.push(files[fileIndex - 1]);
	changeImage({ show: false, complete: true });
	// console.log(fileOptions.current, settings.quiz.complete);
}
