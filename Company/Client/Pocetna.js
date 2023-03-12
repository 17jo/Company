export class Pocetna{
    constructor()
    {
        this.kont=null;
        this.selectEmployeeID=null;//Sector_ID in Employee section
        this.selectTaskID=null; //Sector_ID in Task section
        this.selectAssigned=null;
    }

    crtaj(host)
    {
        let naslov=document.createElement("h3");
        naslov.innerHTML="Company";
        host.appendChild(naslov);

        this.kont=document.createElement("div");
        this.kont.className="glavni";
        host.appendChild(this.kont);
         
        //EMPLOYEE
        
        let divEmployee = document.createElement("div");
        divEmployee.className="divEmployee";
        this.kont.appendChild(divEmployee);

        let labelEm = document.createElement("label");
        labelEm.className="label";
        labelEm.innerHTML="Employee:";
        divEmployee.appendChild(labelEm);

        //FULLNAME
        let divFullName = document.createElement("div");
        divFullName.className="divFullName";
        divEmployee.appendChild(divFullName);

        let labelFullName = document.createElement("label");
        labelFullName.className="label";
        labelFullName.innerHTML="Full name:";
        divFullName.appendChild(labelFullName);

        let tbxFullName = document.createElement("input");
        tbxFullName.type="text";
        divFullName.appendChild(tbxFullName);

        //EMAIL
        let divEmail = document.createElement("div");
        divEmail.className="divEmail";
        divEmployee.appendChild(divEmail);

        let labelEmail = document.createElement("label");
        labelEmail.className="label";
        labelEmail.innerHTML="Email:";
        divEmail.appendChild(labelEmail);

        let tbxEmail = document.createElement("input");
        tbxEmail.type="text";
        divEmail.appendChild(tbxEmail);

        //PHONE
        let divPhone = document.createElement("div");
        divPhone.className="divPhone";
        divEmployee.appendChild(divPhone);

        let labelPhone = document.createElement("label");
        labelPhone.className="label";
        labelPhone.innerHTML="Phone:";
        divPhone.appendChild(labelPhone);

        let tbxPhone = document.createElement("input");
        tbxPhone.type="text";
        divPhone.appendChild(tbxPhone);


        //DATEOFBIRTH
        let divDateOfBirth = document.createElement("div");
        divDateOfBirth.className="divDateOfBirth";
        divEmployee.appendChild(divDateOfBirth);

        let labelDateOfBirth = document.createElement("label");
        labelDateOfBirth.className="label";
        labelDateOfBirth.innerHTML="Date Of Birth:";
        divDateOfBirth.appendChild(labelDateOfBirth);

        let tbxDateOfBirth = document.createElement("input");
        tbxDateOfBirth.type="date";
        divDateOfBirth.appendChild(tbxDateOfBirth);

        //MONTH SALARY
        let divMonthSalary = document.createElement("div");
        divMonthSalary.className="divMonthSalary";
        divEmployee.appendChild(divMonthSalary);

        let labelMonthSalary = document.createElement("label");
        labelMonthSalary.className="label";
        labelMonthSalary.innerHTML="Month Salary:";
        divMonthSalary.appendChild(labelMonthSalary);

        let tbxMonthSalary = document.createElement("input");
        tbxMonthSalary.type="text";
        divMonthSalary.appendChild(tbxMonthSalary);

        //SECTOR

        let divSector = document.createElement("div");
        divSector.className="divSector";
        divEmployee.appendChild(divSector);

        let labelSector= document.createElement("label");
        labelSector.className="label";
        labelSector.innerHTML="Sector:";
        divSector.appendChild(labelSector);

        //SECTOR SELECT FOR EMPLOYEE
        let selectEmployee = document.createElement("select");
        selectEmployee.className = "select1";
        selectEmployee.onchange = (ev)=>{this.ChangeSelect(divEmployee)};
        divSector.appendChild(selectEmployee);
        let op1; //opcija
        
        op1 = document.createElement("option");
        op1.innerHTML = "";
        op1.value = 0;
        selectEmployee.appendChild(op1);
        fetch("https://localhost:5001/Sector/GetSectors/",
        {
             method:"GET"
         }).then(s=>{
             if(s.ok){
                    s.json().then(data=>{
                    data.forEach(el=>{
                    op1 = document.createElement("option");
                    op1.innerHTML = el.name;
                    op1.value = el.id;
                    selectEmployee.appendChild(op1);
                 })
             })
            }
        })



        //BUTTON ADD EMPLOYEE
        let divButtonAddEmployee = document.createElement("div");
        divButtonAddEmployee.className="divButtonAddEmployee";
        divEmployee.appendChild(divButtonAddEmployee);

        
        let btnCreateEmployee = document.createElement("button");
        btnCreateEmployee.onclick=(ev)=>this.AddEmployee(tbxFullName.value,tbxEmail.value,tbxPhone.value,tbxDateOfBirth.value,tbxMonthSalary.value);
        btnCreateEmployee.className = "button";
        btnCreateEmployee.innerHTML="Add Employee";
        divButtonAddEmployee.appendChild(btnCreateEmployee);

        //BUTTON CHANGE PHONE NUMBER
        let divButtonChaneEmployee = document.createElement("div");
        divButtonChaneEmployee.className="divButtonChaneEmployee";
        divEmployee.appendChild(divButtonChaneEmployee);

        let btnChangeEmployee = document.createElement("button");
        btnChangeEmployee.onclick=(ev)=>this.ChangePhoneNumber(divButtonChaneEmployee,tbxFullName.value,tbxPhone.value);
        btnChangeEmployee.className = "button";
        btnChangeEmployee.innerHTML="Change phone number";
        divButtonChaneEmployee.appendChild(btnChangeEmployee);

        //BUTTON DELETE EMPLOYE
        let divButtonDeleteEmployee = document.createElement("div");
        divButtonDeleteEmployee.className="divButtonDeleteEmployee";
        divEmployee.appendChild(divButtonDeleteEmployee);

        let btnDeleteEmployee = document.createElement("button");
        btnDeleteEmployee.onclick=(ev)=>this.DeleteEmployee(tbxEmail.value);
        btnDeleteEmployee.className = "button";
        btnDeleteEmployee.innerHTML="Delete Employee";
        divButtonDeleteEmployee.appendChild(btnDeleteEmployee);


        //Sad kreiranje taska
        
        let divTask = document.createElement("div");
        divTask.className="divTask";
        this.kont.appendChild(divTask);

        let labelTask = document.createElement("label");
        labelTask.className="label";
        labelTask.innerHTML="Task:";
        divTask.appendChild(labelTask);

        //TITLE
        let divTitle = document.createElement("div");
        divTitle.className="divTitle";
        divTask.appendChild(divTitle);

        let labelTitle = document.createElement("label");
        labelTitle.className="label";
        labelTitle.innerHTML="Title:";
        divTask.appendChild(labelTitle);

        let tbxTitle= document.createElement("input");
        tbxTitle.type="text";
        divTask.appendChild(tbxTitle);

        //Description
        let divDescription = document.createElement("div");
        divDescription.className="divDescription";
        divTask.appendChild(divDescription);

        let labelDescription= document.createElement("label");
        labelDescription.className="label";
        labelDescription.innerHTML="Description:";
        divDescription.appendChild(labelDescription);

        let tbxDescription= document.createElement("input");
        tbxDescription.type="text";
        divDescription.appendChild(tbxDescription);

        //sector
        let divSectorTask = document.createElement("div");
        divSectorTask.className="divSector";
        divTask.appendChild(divSectorTask);

        let labelSectorTask= document.createElement("label");
        labelSectorTask.className="label";
        labelSectorTask.innerHTML="Sector:";
        divSectorTask.appendChild(labelSectorTask);
        
        let selectTask = document.createElement("select");
        selectTask.className = "select2";
        selectTask.onchange = (ev)=>{this.ChangeSelect2(divAssigneeSelect,divTask)};
        divSectorTask.appendChild(selectTask);
        let op2; //option
        
        op2 = document.createElement("option");
        op2.innerHTML = "";
        op2.value = 0;
        selectTask.appendChild(op2);
        fetch("https://localhost:5001/Sector/GetSectors/",
        {
            method:"GET"
        }).then(s=>{
            if(s.ok){
                s.json().then(data=>{
                data.forEach(el=>{
                op2 = document.createElement("option");
                op2.innerHTML = el.name;
                op2.value = el.id;
                selectTask.appendChild(op2);
                })
             })
            }
        })

        //Assignee
        let divAssignee= document.createElement("div");
        divAssignee.className="divAssignee";
        divTask.appendChild(divAssignee);

        let labelAssignee= document.createElement("label");
        labelAssignee.className="label";
        labelAssignee.innerHTML="Assignee(Email of Employee):";
        divAssignee.appendChild(labelAssignee);
        
        let divAssigneeSelect = document.createElement("div");
        divAssigneeSelect.className="divAssigneeSelect";
        divAssignee.appendChild(divAssigneeSelect);

        //DUODATE
        let divDuoDate = document.createElement("div");
        divDuoDate.className="divDuoDate";
        divTask.appendChild(divDuoDate);

        let labelDuoDate = document.createElement("label");
        labelDuoDate.className="label";
        labelDuoDate.innerHTML="Duo date:";
        divDuoDate.appendChild(labelDuoDate);

        let tbxDuoDate = document.createElement("input");
        tbxDuoDate.type="date";
        divDuoDate.appendChild(tbxDuoDate);

        //BUTTON ADD Task
        let divButtonAddTask = document.createElement("div");
        divButtonAddTask.className="divButtonAddTask";
        divTask.appendChild(divButtonAddTask);

        let btnCreateTask= document.createElement("button");
        btnCreateTask.onclick=(ev)=>this.AddTask(tbxTitle.value,tbxDescription.value,tbxDuoDate.value);
        btnCreateTask.className = "button";
        btnCreateTask.innerHTML="Add Task";
        divButtonAddTask.appendChild(btnCreateTask);

        //BUTTON Change Task
        let divButtonGetEmployeesWhitTasksFromLastMonth = document.createElement("div");
        divButtonGetEmployeesWhitTasksFromLastMonth.className="divButtonChangeTask";
        divTask.appendChild(divButtonGetEmployeesWhitTasksFromLastMonth);

        let btnGetTask= document.createElement("button");
        btnGetTask.onclick=(ev)=>this.GetTask(divTask);
        btnGetTask.className = "button";
        btnGetTask.innerHTML="Employees Whit Tasks From LastMonth";
        divButtonGetEmployeesWhitTasksFromLastMonth.appendChild(btnGetTask);
    }

    AddEmployee(fullName,email,phone,dateOfBirth,monthsalary)
    {
        if(this.selectEmployeeID==null) alert("Choose sector!");
        if(fullName==null) alert("You have not entered a name!");
        if(email==null) alert("You have not entered a email!");
        if(phone==null) alert("You have not entered a phone!");
        if(dateOfBirth==null) alert("You have not entered a dateOfBirth!");
        if(monthsalary==null) alert("You have not entered a monthsalary!");
        fetch("https://localhost:5001/Employee/AddEmployee/"+fullName+"/"+email+"/"+phone+"/"+dateOfBirth+"/"+monthsalary+"/"+this.selectEmployeeID,
        {
            method:"POST"
        }).then( s=>
            {
                if (s.ok)
                {
                    alert("Employee is added");
                }
                else
                {
                    if(s.status==202){
                    alert("Error");
                    }
                }
            })
        .catch(p => {
            console.log(p);
            alert ("Error");
        });
    }

    AddTask(title,description,duoDate)
    {
        if(this.selectAssignee==null) alert("Choose assignee!");
        if(title==null) alert("You have not entered a title!");
        if(description==null) alert("You have not entered a description!");
        if(duoDate==null) alert("You have not entered a duoDate!");
        fetch("https://localhost:5001/Task_X/AddTask/"+this.selectAssigned+"/"+title+"/"+description+"/"+duoDate,
        {
            method:"POST"
        }).then( s=>
            {
                if (s.ok)
                {
                    alert("Task is added");
                }
                else
                {
                    if(s.status==202){
                        alert("Error");
                    }
                }
        })
        .catch(p => {
            console.log(p);
            alert ("Error");
        });
    }
    ChangePhoneNumber(divButtonChaneEmployee,tbxFullName,tbxPhone)
    {
        alert("You must enter a name and phone number above in the fields!");
        
        let labelNewNumber = document.createElement("label");
        labelNewNumber.className="label";
        labelNewNumber.innerHTML="New Number:";
        divButtonChaneEmployee.appendChild(labelNewNumber);

        let tbxNewNumber = document.createElement("input");
        tbxNewNumber.type="text";
        divButtonChaneEmployee.appendChild(tbxNewNumber);

        let btnNewNumber = document.createElement("button");
        btnNewNumber.onclick=(ev)=>this.AddNewNumber(tbxFullName,tbxPhone,tbxNewNumber.value);
        btnNewNumber.className="button";
        btnNewNumber.innerHTML="New Number:";
        divButtonChaneEmployee.appendChild(btnNewNumber);

    }
    AddNewNumber(tbxFullName,tbxPhone,tbxNewNumber)
    {
        fetch("https://localhost:5001/Employee/ChangePhoneNumber/"+tbxFullName+"/"+tbxPhone+"/"+tbxNewNumber,
        {
            method:"PUT"
        }).then( s=>
             {
                if (s.ok)
                {
                    alert("Phone number has been changed");
                }
                else
                {
                    if(s.status==202){
                        alert("Error");
                    }
                }
         })
        .catch(p => {
            console.log(p);
            alert ("Error");
        });
    }
    
    DeleteEmployee(tbxEmail)
    {
        fetch("https://localhost:5001/Employee/DeleteEmployee/"+tbxEmail,
        {
            method:"DELETE"
        }).then(s=>{
            if(s.ok){
                alert("The employee has been deleted");
            }
            else
            {
                alert("Invalid email");
            }
        })
    }
    ChangeSelect()
    {
        let optionEl = this.kont.querySelector(".select1");
        this.selectEmployeeID = optionEl.options[optionEl.selectedIndex].value;
        console.log(this.selectEmployeeID);
    }
    ChangeSelect2(divAssignee,divTask)
    {
        let deleteChild = this.kont.querySelector(".divAssigneeSelect");
        let parent =  deleteChild.parentNode;
        parent.removeChild(deleteChild);

        let divAssigneeSelect = document.createElement("div");
        divAssigneeSelect.className="divAssigneeSelect";
        parent.appendChild(divAssigneeSelect);


        let optionEl = this.kont.querySelector(".select2");
        this.selectTaskID = optionEl.options[optionEl.selectedIndex].value;
        console.log(this.selectTaskID);

        let selectAssignee = document.createElement("select");
        selectAssignee.className = "select3";
        let op3; //opcija
        selectAssignee.onchange = (ev)=>{this.ChangeSelect3()};
        divAssigneeSelect.appendChild(selectAssignee);
        
        
        op3 = document.createElement("option");
        op3.innerHTML = "";
        op3.value = 0;
        selectAssignee.appendChild(op3);

        if (this.selectTaskID!=null) 
        fetch("https://localhost:5001/Employee/GetEmployees/"+this.selectTaskID,
        {
             method:"GET"
         }).then(s=>{
             if(s.ok){
                    s.json().then(data=>{
                    data.forEach(el=>{
                    op3 = document.createElement("option");
                    op3.innerHTML = el.email;
                    op3.value = el.id;
                    selectAssignee.appendChild(op3);
                 })
             })
            }
        })
    }

    ChangeSelect3()
    {
        let optionEl = this.kont.querySelector(".select3");
        this.selectAssigned = optionEl.options[optionEl.selectedIndex].value;
        console.log(this.selectAssigned);
    }
    
    GetTask(divTask)
    {
        let labelNames;
        let divInfo;
        if(this.selectTaskID==null) alert("Choose sector");
        fetch("https://localhost:5001/Task_X/EmployeesWhitTasksFromLastMonth/"+this.selectTaskID,
        {
             method:"GET"
         }).then(s=>{
             if(s.ok){
                    s.json().then(data=>{
                    data.forEach(el=>{
                    divInfo = document.createElement("div");
                    divInfo.className="divInfo";
                    divTask.appendChild(divInfo);
                    labelNames =  document.createElement("label");
                    labelNames.innerHTML = "Name:"+el.fullName+" email:"+el.email;
                    divInfo.appendChild(labelNames);
                 })
             })
            }
        })
    }
}