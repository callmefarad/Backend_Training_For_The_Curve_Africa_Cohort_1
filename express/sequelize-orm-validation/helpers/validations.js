const validator = require('@hapi/joi');

const studentValidator = (data) => {
    const v = validator.object( {
        studentName: validator.string().min( 3 ).max( 30 ),
        studentScore: validator.number()
    })
    return v.validate( data );
}

module.exports.studentValidator = studentValidator;