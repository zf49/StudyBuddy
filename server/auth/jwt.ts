import jwtDecode, {JwtPayload} from "jwt-decode";

export const jwtDecodeUser = (jwt: string): string | null => {
    const userToken = jwt;
    const token = userToken.split(' ')
    if (token.length < 0) return null
    const decoded = jwtDecode<JwtPayload>(token[1])
    // authID
    return decoded.sub;
}