/** Quando for iniciar o MongoDB via cmd  
 *  mongod --dbpath C:\mongoDB\data\db --setParameter failIndexKeyTooLong=false
 *  mongod --dbpath \data\db --setParameter failIndexKeyTooLong=false
 * 
 * -dbpath define onde está a nossa base de dados
 * --setParameter failIndexKeyTooLong=false é necessário para permitir cadastrar textos longos
*/
module.exports = {
    secret: 'ilovescotchyscotch',
    url: 'mongodb://localhost:27017/admin'
}