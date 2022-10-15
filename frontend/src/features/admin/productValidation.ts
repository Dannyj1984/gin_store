import * as yup from 'yup';

export const validationSchema = yup.object({
    name: yup.string().required('Please enter a product name'),
    brand: yup.string().required('Please choose a brand'),
    type: yup.string().required('Please choose a product type'),
    price: yup.number().required().moreThan(100),
    quantityInStock: yup.number().required().min(0).max(200),
    description: yup.string().required('Please enter a description for this product'),
    file: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Please provide an image')
    })
})