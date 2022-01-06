export const radiansToDegrees = (radians: number) => {
    return radians * 180.0/Math.PI;
}

export const clampDegrees = (degree: number, degreeToRoundTo = 90) => {
    //return Math.round(degree * Math.pow(10, degreeToRoundTo)) / Math.pow(10, degreeToRoundTo);

    if(degree > 0)
        return Math.round(degree / degreeToRoundTo) * degreeToRoundTo;
    return Math.round(degree / -degreeToRoundTo) * -degreeToRoundTo;
}

export const getAngles = (source: number[][] /* matrix 4x4 */ ) => {
        var thetaX = Math.asin(source[2][1]);
        var thetaY = 0.0;
        var thetaZ = 0.0;

        if (thetaX < (Math.PI / 2))
        {
            if (thetaX > (-Math.PI / 2))
            {
                thetaZ = Math.atan2(-source[0][1], source[1][1]);
                thetaY = Math.atan2(-source[2][0], source[2][2]);
            }
            else
            {
                thetaZ = -Math.atan2(-source[0][2], source[0][0]);
                thetaY = 0;
            }
        }
        else
        {
            thetaZ = Math.atan2(source[0][2], source[0][0]);
            thetaY = 0;
        }
        // Create return object.
        var angles = [
             clampDegrees((radiansToDegrees(thetaX))),
             clampDegrees((radiansToDegrees(thetaY))),
             clampDegrees((radiansToDegrees(thetaZ))),
             radiansToDegrees(thetaX),
             radiansToDegrees(thetaY),
             radiansToDegrees(thetaZ),
        ];

        // Return angles.
        return angles;
    }