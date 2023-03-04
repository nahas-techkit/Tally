const express = require ("express")
const router = express.Router()
const company = require('../Controllers/Comapny')
const ledger = require('../Controllers/Ledger')

// Comapny Routes
router.post('/createComapny',company.createCompany,)
router.get('/getComany/:id',company.getCompanyById,)
router.get('/getAllCompanies',company.getAllcompanies,)
router.put('/editCompany/:id',company.editComapnyDetails,)
router.delete('/deleteComapny/:id',company.deleteCompany,)

// Ledger Routes
router.post('/createLedger/:id',ledger.createLedger,)
router.get('/getLedger/:id',ledger.getLedgerById,)
router.get('/getAllLedgers/:id',ledger.getAllLedger,)
router.put('/editLedger/:ledgerId',ledger.editLedger,)
router.delete('/deleteLedger/:ledgerId',ledger.deleteLedger,)






module.exports = router;