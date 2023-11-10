
function save() {
   let fullname = document.getElementById('fullname').value;
   let msnv = document.getElementById('msnv').value;
   let email = document.getElementById('email').value;
   let phone = document.getElementById('phone').value; 
   let address = document.getElementById('address').value;
   let gender = '';
   if( document.getElementById('boymale').checked){
    gender = document.getElementById('boymale').value;
   }else
        if(document.getElementById('girlmale').checked){
            gender = document.getElementById('girlmale').value;  
        }
        if(_.isEmpty(fullname)){
            fullname='';
            document.getElementById('fullname-error').innerHTML = 'Vui long nhap ten';
        }else if(fullname.length <= 2){
            fullname='';
            document.getElementById('fullname-error').innerHTML = 'Ho va ten hon 2 ki tu';
        }else if(fullname.length > 30){
            fullname='';
            document.getElementById('fullname-error').innerHTML = 'Ho va ten khong hon 30 ki tu';
            }
        
        else{
            document.getElementById('fullname-error').innerHTML = '';
        }
        if(_.isEmpty(msnv)){
            msnv='';
            document.getElementById('msnv-error').innerHTML = 'Vui long nhap msnv';
        }else if(msnv.length <= 2){
            msnv='';
            document.getElementById('msnv-error').innerHTML = 'Msnv hon 2 ki tu';
        }else if(msnv.length > 30){
            msnv='';
            document.getElementById('msnv-error').innerHTML = 'Msnv khong hon 30 ki tu';
            }
        
        else{
            document.getElementById('msnv-error').innerHTML = '';
        }
        if(_.isEmpty(email)){
            email='';
            document.getElementById('email-error').innerHTML = 'Vui long nhap email';
        }    
        else{
            document.getElementById('email-error').innerHTML = '';
        }
        if(_.isEmpty(phone)){
            phone='';
            document.getElementById('phone-error').innerHTML = 'Vui long nhap sdt';
        }else if(phone.length <= 2){
            phone='';
            document.getElementById('phone-error').innerHTML = 'SDT hon 2 ki tu';
        }else if(phone.length > 30){
            phone='';
            document.getElementById('phone-error').innerHTML = 'SDT khong hon 30 ki tu';
            }
        
        else{
            document.getElementById('phone-error').innerHTML = '';
        }
        if(_.isEmpty(address)){
            address='';
            document.getElementById('address-error').innerHTML = 'Vui long nhap dia chi';
        }else if(address.length <= 2){
            address='';
            document.getElementById('address-error').innerHTML = 'Dia chi hon 2 ki tu';
        }else if(address.length > 30){
            address='';
            document.getElementById('address-error').innerHTML = 'Dia chi khong hon 30 ki tu';
            }
        
        else{
            document.getElementById('address-error').innerHTML = '';
        }
        if(_.isEmpty(gender)){
            gender='';
            document.getElementById('gender-error').innerHTML = 'Vui long chon gioi tinh';
        }else{
            document.getElementById('gender-error').innerHTML = '';
        }
        if(fullname && msnv && email && phone && address && gender){
            // Them nhan vien vao DANH SACH NHAN VIEN

            let personnels = localStorage.getItem('personnels') ? JSON.parse(localStorage.getItem('personnels')) : [];

            personnels.push({
                fullname: fullname,
                msnv:msnv,
                email:email,
                phone:phone,
                address:address,
                gender:gender,
            });

            localStorage.setItem('personnels', JSON.stringify(personnels));

            this.renderListPersonnel();
        }
   }
   function renderListPersonnel(){

    let personnels = localStorage.getItem('personnels') ? JSON.parse(localStorage.getItem('personnels')) : [];

    if(personnels.length ===0){
        document.getElementById('list-personnel').style.display = 'none';
        return false;
    } 

    document.getElementById('list-personnel').style.display = 'block';

    let tableContent= `<tr>
            <td width = '20'>#</td>
            <td>Họ Và Tên</td>
            <td>Msnv</td>
            <td>Địa chỉ Email</td>
            <td>Sdt</td>
            <td>Giới tính</td>
            <td>Địa chỉ</td>
            <td width = '80'>Hành Động</td>
        </tr>`;

        personnels.forEach((personnel, index)=>{
            let personnelId = index;
            let genderLabel = parseInt(personnel.gender) === 1 ? 'Nam':'Nữ';
            index++;
            tableContent += `<tr>
            <td>${index}</td>
            <td>${personnel.fullname}</td>
            <td>${personnel.msnv}</td>
            <td>${personnel.email}</td>
            <td>${personnel.phone}</td>
            <td>${genderLabel}</td>
            <td>${personnel.address}</td>
            <td>
                <a href ='#' style = "color: white;" >Edit</a> | <a href ='#' onclick ='deletePersonnel(${personnelId})' style = "color: white;" >Delete</a>
            </td>
        </tr>`;
        })
        document.getElementById('grid-personnels').innerHTML= tableContent;   
   }
   function deletePersonnel(id){
    let personnels = localStorage.getItem('personnels') ? JSON.parse(localStorage.getItem('personnels')) : [];
    personnels.splice(id, 1);
    localStorage.setItem('personnels', JSON.stringify(personnels));
    renderListPersonnel();
   }