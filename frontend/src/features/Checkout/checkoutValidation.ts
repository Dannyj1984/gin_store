import * as yup from 'yup';

export const validationSchema = [
    yup.object({
        fullName: yup.string().required('Full name is required'),
        address1: yup.string().required('Line 1 of address is required'),
        city: yup.string().required('City is required'),
        county: yup.string().required('County is required'),
        country: yup.string().required('Country is required'),
        postCode: yup.string().required('Postcode is required')
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required('Please enter your name as it appears on your card')
    })
] 