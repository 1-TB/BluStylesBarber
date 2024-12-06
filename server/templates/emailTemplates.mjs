//Email contact notification
export const createContactEmail = (name, email, message) => {
`
   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #DCDCDC;">
     <div style="background-color: white; padding: 30px; border-radius: 8px;">
       <!-- Logo -->
       <div style="text-align: center; margin-bottom: 30px;">
         <img src="cid:company-logo" alt="Logo" style="width: 100px;">
       </div>

       <!-- Main Content --> 
       <h2 style="color: #0f0f0f; font-weight: 500; margin-bottom: 25px;">New Contact Form Submission</h2>

       <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
         Hello ${name},
       </p>

       <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
         Your bank account details were recently updated. You can 
         <a href="#" style="color: #2196F3; text-decoration: none;">log in</a> 
         to see the updated details.
       </p>

       <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
         No action is required on your side, but if you feel that the change was made in error, please contact us by 
         <a href="#" style="color: #2196F3; text-decoration: none;">emailing our support team</a>.
       </p>

       <!-- Signature -->
       <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 5px;">
         Sincerely,
       </p>
       <p style="color: #666; font-size: 16px; line-height: 1.5;">
         The Your Company team
       </p>

       <!-- Footer -->
       <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 14px;">
         <p>Need help? <a href="#" style="color: #2196F3; text-decoration: none;">Sign in</a> | <a href="#" style="color: #2196F3; text-decoration: none;">Help Center</a></p>
         <p style="margin-top: 15px;">© ${new Date().getFullYear()} Your Company, Address, City, State ZIP</p>
       </div>
     </div>
   </div>
 `
};
