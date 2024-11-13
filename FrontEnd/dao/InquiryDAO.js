import origin from '../config/origin.js';

export default class InquiryDAO{

    async getInquiry() {
        let url = origin + "/BackEnd/controller/inquiryController.php?function=get";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }

    async addInquiry(title, messageContent) {
        let url = origin + "/BackEnd/controller/inquiryController.php?function=add";
        let formData = new FormData();
        formData.append("title",title);
        formData.append("message",messageContent);
        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    }

    async answerInquiry(inquiryId, messageContent){
        let url = origin + "/BackEnd/controller/inquiryController.php?function=answer";
        let formData = new FormData();
        formData.append("inquiryId",inquiryId);
        formData.append("message",messageContent);
        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;

    }

    async sumbitInquiry(inquiryId){
        let url = origin + "/BackEnd/controller/inquiryController.php?function=submit";
        let formData = new FormData();
        formData.append("inquiryId",inquiryId);
        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    }

    async getPublicInquirys(){
        let url = origin + "/BackEnd/controller/inquiryController.php?function=getPublicInquirys"
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }

    async getAnsweredInquirys(){
        let url = origin + "/BackEnd/controller/inquiryController.php?function=getAnsweredInquirys";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }
}