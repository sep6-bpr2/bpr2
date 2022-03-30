const { Router } = require('express')
const router = Router()
import { getUserByUsername } from "../models/login"
import { getControlPointsMinimal, getDescriptionsByControlPointId } from "../models/controlPoints"


//TEST - http://localhost:3000/api/controlPoints/listMinimal/rokas/gb
router.get("/listMinimal/:username/:language", async (req, res) => {
    //Get user
    const users = await getUserByUsername(req.params.username)

    //CHeck if user has admin role
    if (users[0].role == "admin") {
        let controlPoints = await getControlPointsMinimal()

        for (let i = 0; i < controlPoints.length; i++) {
            const descriptions = await getDescriptionsByControlPointId(controlPoints[i].id)

            for (let j = 0; j < descriptions.length; j++) {
                if (descriptions[j].language == req.params.language) {
                    controlPoints[i].description = descriptions[j].description
                }
            }
        }
        res.send(controlPoints)

    } else {
        res.sendStatus(403) // user does not have access
    }
})

module.exports = router