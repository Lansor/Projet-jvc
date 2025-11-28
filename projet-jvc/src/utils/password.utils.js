import bcrypt from "bcrypt";


export const hashPasswordBeforeSave = async function () {
	if (!this.password) return;

	const saltRounds = 10;
	const hash = await bcrypt.hash(this.password, saltRounds);
	this.password = hash;
};
