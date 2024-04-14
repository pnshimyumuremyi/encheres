import jwt from 'jsonwebtoken'


export const verifierToken = (req, res, next) => { //Extraire le token de la requete
    const bearerToken = req.headers.authorization
    //console.log(req.headers.authorization)
    //Verifier que le token est bien present sinon retourner un message d'erreur
    if (!bearerToken) return res.status(401).json({ message: 'Pas 2 authentifie' })
    const token = bearerToken.split(' ')[1]
    //Verifier que le token est bien pour cet utilisateur
    jwt.verify(token, process.env.JWT_SECRET, (error, valeurDecode) => {
    if (error) return res.status(401).json({ message: error.message }) //Mettre l'id de l'utilisateur pour passer aux callbacks suivants
    req.userId = valeurDecode.dataValues.id
    console.log(valeurDecode.dataValues.id)
    next()
    })}

    export const isAdmin = async (req, res, next) => {
        //Extraire le userId de la requete precedente
       
        const userId = req.userId
        //Retourner ce message si pas de userId
        if (!userId) return res.status(403).json({ message: "Pas d'utilisateur" }) 
        try {
            const user = await User.findByPk(userId) //Si pas de user, retourner ce message
            if (!user) return res.status(404).json({ message: 'utilisateur non existant' }) 
        try {
        //Extraire les roles de l'utilisateur de la base de donnee
        const roles = await user.getRoles() //Si pas de roles, retourner ce message
        if (!roles.length) return res.status(404).json({ message: 'Pas de roles' })
        //Verifier que l'utilisateur est admin
        const hasAdminRight = roles.map(role => role.nom).find(nom => nom.toLowerCase() === 'admin')
        if (hasAdminRight) {
            next()
            return
        } //Si l'utilisateur n'est pas admin, envoyer ce message
        return res.status(403).json({ message: 'Doit avoir les droits admin' }) } 
        catch (error) {
            return res.status(403).json({ message: error.message })
        }
    } catch (error) {
        return res.status(403).json({ message: error.message }) 
    }
}