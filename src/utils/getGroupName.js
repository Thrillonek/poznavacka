export function getGroupName(idx, groupNameArray) {
	while (groupNameArray[idx] == undefined) {
		idx--;
		if (idx < 0) break;
	}
	return groupNameArray[idx];
}
