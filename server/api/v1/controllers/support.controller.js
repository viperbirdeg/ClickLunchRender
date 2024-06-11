const postTicket = (req,res) => {
    return res.status(200).json({message : "Ticket correctamente enviado"});
}

module.exports = {
    postTicket
}