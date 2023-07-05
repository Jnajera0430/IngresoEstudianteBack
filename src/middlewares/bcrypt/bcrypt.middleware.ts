import * as bcrypt from "bcryptjs";

export class Bcrypt {
    /**
     * 
     * @param password 
     * @returns 
     */
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    /**
     * 
     * @param password 
     * @param hashedPassword 
     * @returns 
     */
    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }
}