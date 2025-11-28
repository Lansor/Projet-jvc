import bcrypt from "bcrypt";

// Hash du mot de passe avant sauvegarde (middleware async sans next)
export const hashPasswordBeforeSave = async function () {
	if (!this.isModified("password")) {
		return;
	}

	const saltRounds = 10;
	const hash = await bcrypt.hash(this.password, saltRounds);
	this.password = hash;
};
