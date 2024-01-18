import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";

export function unAuthorizedException(response: NextApiResponse){
    response
        .status(StatusCodes.FORBIDDEN)
        .json({
            message: ReasonPhrases.FORBIDDEN
        });
}

export function MethodNotAllowedException(response: NextApiResponse){
    response
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .json({
            message: ReasonPhrases.METHOD_NOT_ALLOWED
        });
}

export function BadRequestException(response: NextApiResponse){
    response
        .status(StatusCodes.BAD_REQUEST)
        .json({
            message: ReasonPhrases.BAD_REQUEST
        });
}