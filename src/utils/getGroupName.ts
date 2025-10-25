/**
 * Returns the group name for the given index from the groupNameArray.
 *
 * The result is determined by taking the closest index in the array that is lower or equal to the input index.
 *
 * @param index The index of the group name to retrieve.
 * @param groupNameArray The array of group names and their starting indexes.
 */
export function getGroupName(index: number, groupNameArray: Record<number, string>): string {
	while (groupNameArray[index] == undefined) {
		index--;
		if (index < 0) break;
	}
	return groupNameArray[index];
}
