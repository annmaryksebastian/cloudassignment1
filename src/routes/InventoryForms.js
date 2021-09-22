import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import axios from 'axios';
import getInitials from '../initialData/getInitials';
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography
} from '@material-ui/core';

//import types from separate file using require
var allTypes = require('../initialData/Data').default;

const InventoryView = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {

       
        //testing class inheritance 
        
        //get form data using parse
        var formData = JSON.parse(localStorage.getItem('inventoryData')) || [];

        //set the state for formData
        setData(formData)
    }, [])

    
   
   

   

    //promises and callbacks
    let pro = new Promise((resolve, reject) => {
        var formData = JSON.parse(localStorage.getItem('inventoryData'))
        var inventoryArr = []
        formData.map((item) => {
            item.rows.map((row) => {
                inventoryArr.push(row.resource)
                return inventoryArr;
            })
            return inventoryArr;
        })


        if (inventoryArr.includes("Gray Niccols")) {
            resolve("Success")
        }
        else {
            reject("Failure")
        }
    })
    pro.then((message) => {
        console.log("The item exists?", message)
    }).catch((message) => {
        console.log("The item exists?", message)
    })



    return (
        <div>
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="sm">
                    <Formik
                        initialValues={{
                            suppliedBy: '',
                            type: '',
                            date: '',
                            billNo: '',
                            comments: '',
                            location: '',
                            rows: [{
                                resource: '',
                                price: '',
                                quantity: '',
                            },
                            ]
                        }}
                        validationSchema={
                            Yup.object().shape({
                                type: Yup.string().max(255).required('Type is required'),
                                suppliedBy: Yup.string().max(255).required('Supplied By is required'),
                                date: Yup.string().max(255).required('Date is required'),
                                comments: Yup.string().max(255).required('Comments are required'),
                                billNo: Yup.string().max(255).required('bill Number are required')
                            })
                        }
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            console.log(values.suppliedBy)
                            var formData = JSON.parse(localStorage.getItem('inventoryData')) || [];
                            console.log(formData);
                            formData.push({
                                "suppliedBy": values.suppliedBy,
                                "type": values.type,
                                "date": values.date,
                                "billNo": values.billNo,
                                "comments": values.comments,
                                "rows": values.rows,
                                "location": values.location
                            });
                            console.log(formData);
                            localStorage.setItem("inventoryData", JSON.stringify(formData))
                            formData = JSON.parse(localStorage.getItem('inventoryData')) || [];
                            sessionStorage.setItem("totalCount", formData.length)
                            setData(formData)
                            console.log("Data from session storage is size of all items in local storage:", sessionStorage.getItem('totalCount'))
                            console.log("Data from local storage is form data", formData)
                            resetForm({})
                        }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values
                        }) => (
                            <form onSubmit={handleSubmit}>
                                {/* <Box mb={1}> */}
                                <Typography
                                    color="textPrimary"
                                    variant="h3"
                                >
                                    IT ASSET MANAGEMENT
                                </Typography>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Box my={2}>

                                        </Box>
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Box my={2}>

                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            multiline
                                            error={Boolean(touched.suppliedBy && errors.suppliedBy)}
                                            fullWidth
                                            helperText={touched.suppliedBy && errors.suppliedBy}
                                            label="Supplied By"
                                            margin="normal"
                                            name="suppliedBy"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.suppliedBy}
                                            variant="outlined"
                                        />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            name="type"
                                            label="Type"
                                            onChange={handleChange}
                                            required
                                            select
                                            SelectProps={{ native: true }}
                                            value={values.type}
                                            variant="outlined"
                                            margin="normal"
                                        >
                                            <option value="" />
                                            {allTypes.map((option) => (
                                                <option
                                                    key={option.name}
                                                    value={option.name}
                                                >
                                                    {option.name}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>


                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={Boolean(touched.billNo && errors.billNo)}
                                            fullWidth
                                            helperText={touched.billNo && errors.billNo}
                                            label="Invoice Number"
                                            margin="normal"
                                            name="billNo"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.billNo}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={Boolean(touched.date && errors.date)}
                                            fullWidth
                                            helperText={touched.date && errors.date}
                                            type="date"
                                            margin="normal"
                                            name="date"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.date}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <div style={{ paddingTop: 20 }}>
                                    <FieldArray name="rows">
                                        {({ insert, remove, push }) => (
                                            <div className="container">
                                                <div className="row clearfix">
                                                    <div className="col-md-12 column">
                                                        <table
                                                            className="table table-bordered table-hover"
                                                            id="tab_logic"
                                                        >
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-center"> # </th>
                                                                    <th className="text-center"> Resource </th>
                                                                    <th className="text-center"> Quantity </th>
                                                                    <th className="text-center"> Price </th>

                                                                    <th />
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {/* <div> */}
                                                                {values.rows.length > 0 && values.rows.map((item, idx) => (
                                                                    <tr id="addr0" key={idx}>
                                                                        <td>{idx + 1}</td>
                                                                        <td style={{ width: "33%" }}>
                                                                            <TextField
                                                                                // error={ Boolean(touched.rows[0].quantity )}
                                                                                fullWidth
                                                                                // helperText={ touched.rows && errors.rows}
                                                                                label="Resource"
                                                                                type="text"
                                                                                size="small"
                                                                                margin="normal"
                                                                                name={`rows[${idx}].resource`}
                                                                                onBlur={handleBlur}
                                                                                onChange={e => {
                                                                                    handleChange(e)
                                                                                }
                                                                                }
                                                                                value={values.rows[idx].resource}
                                                                                variant="outlined"
                                                                                required
                                                                            />

                                                                        </td>
                                                                        <td style={{ width: "33%" }}>
                                                                            <TextField
                                                                                // error={ Boolean(touched.rows[0].quantity )}
                                                                                fullWidth
                                                                                // helperText={ touched.rows && errors.rows}
                                                                                label="Quantity"
                                                                                type="number"
                                                                                size="small"
                                                                                margin="normal"
                                                                                name={`rows[${idx}].quantity`}
                                                                                onBlur={handleBlur}
                                                                                onChange={e => {
                                                                                    handleChange(e)
                                                                                }
                                                                                }
                                                                                value={values.rows[idx].quantity}
                                                                                variant="outlined"
                                                                                required
                                                                            />
                                                                        </td>

                                                                        <td style={{ width: "20%" }}>
                                                                            <TextField
                                                                                // error={Boolean(touched.price && errors.price)}
                                                                                fullWidth
                                                                                type="number"
                                                                                //helperText={touched.price && errors.price}
                                                                                label="Price"
                                                                                margin="normal"
                                                                                size="small"
                                                                                name={`rows[${idx}].price`}
                                                                                onBlur={handleBlur}
                                                                                onChange={e => {
                                                                                    handleChange(e)
                                                                                }
                                                                                }
                                                                                value={values.rows[idx].price}
                                                                                variant="outlined"
                                                                                required
                                                                            />
                                                                        </td>

                                                                        <td>
                                                                            <Button
                                                                                className="secondary"
                                                                                onClick={() => remove(idx)}
                                                                                formNoValidate
                                                                                color="secondary"
                                                                                variant="contained"
                                                                                size="small"
                                                                            >
                                                                                Remove
                                                                            </Button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                                {/* </div> */}
                                                            </tbody>
                                                        </table>
                                                        <Button
                                                            type="button"
                                                            onClick={() => push({ resource: '', price: '', quantity: '', GST: 0 })}
                                                            className="secondary"
                                                            formNoValidate
                                                            color="secondary"
                                                            variant="contained"
                                                            size="small"
                                                        >
                                                            Add Resource
                                                        </Button>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </FieldArray>
                                </div>


                                <TextField
                                    multiline
                                    error={Boolean(touched.comments && errors.comments)}
                                    fullWidth
                                    rows={3}
                                    helperText={touched.comments && errors.comments}
                                    label="comments"
                                    margin="normal"
                                    name="comments"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.comments}
                                    variant="outlined"
                                />
                                <Box my={2}>
                                    <Button
                                        color="secondary"
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        SAVE
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>

      
     
            <table style={{ width: 1000 }}>
                <thead>
                    <tr>
                        <th>Type of resource</th>
                        <th>Supplied by?</th>
                        <th>comments</th>
                    </tr>
                </thead>
                <tbody>

                    {data.map(function (d, idx) {
                        return (
                            <tr key={idx}>
                                <td>{d.type}</td>
                                <td>{d.suppliedBy}</td>
                                <td>{d.comments}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
                }

export default InventoryView;
