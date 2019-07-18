module.exports = (given, original) => {
	for (let key in original) {
		const originalType = typeof original[key]
		const givenType = typeof given[key]
    
		if (given[key] === undefined) throw new Error('Objects must be same')
		if (originalType !== givenType) throw new Error(`Object\'s id ${key} expected to be '${originalType}' but found: ${givenType}`)
	}
}