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
    }

    async answerInquiry(){
        let url = origin + "/BackEnd/controller/inquiryController.php?function=answer";
        let formData = new FormData();
        formData.append("inquiryId",inquiryId);
        formData.append("message",messageContent);

    }

    async sumbitInquiry(){
        let url = origin + "/BackEnd/controller/inquiryController.php?function=submit";
        let formData = new FormData();
        formData.append("inquiryId",inquiryId);
    }

    async getPublicInquirys(){

    }

    async getAnsweredInquirys(){

    }
}