(function() {
  document.getElementById('logout').addEventListener('click', function(){
    postLogout();
  });
  document.getElementById('sqlquery').addEventListener('click', function(){
    sqlinput();
  });
  document.getElementById('interSB').addEventListener('click', function(){
    sqlselect();
  });
  document.getElementById('interDB').addEventListener('click', function(){
    sqldelete();
  });
  document.getElementById('interUB').addEventListener('click', function(){
    sqlupdate();
  });
  document.getElementById('interIB').addEventListener('click', function(){
    sqlinsert();
  });
})();
// logout button
function postLogout() {
  fetch('/admin/logout', {
    method: 'POST',
  }).then(resp => resp.json())
  .then((resp) => {
    window.location.href = resp.redirect;
  });
}
// sql input
function sqlinput(){
  const querytext = document.getElementById('textquery').value;
  postQuery(querytext);
}
// sql select
function sqlselect(){
  const inattr = document.getElementById('interSA').value;
  const intable = document.getElementById('interST').value;
  const inwhere = document.getElementById('interSW').value;
  if(inattr==''||intable==''){
    let dataframe = document.getElementById('dataframe');
    let p = document.createElement('p');
    p.className = 'datalogout-fail datalogout';
    p.style = 'padding:10px 0px 10px 10px';
    p.appendChild(document.createTextNode('Some Field is Empty'));
    dataframe.appendChild(p);
    return;
  } else {
    let query = `SELECT ${inattr} FROM ${intable} ${(inwhere!='')?`WHERE ${inwhere}`:''}`;
    postQuery(query);
  }
}
// sql delete
function sqldelete(){
  const intable = document.getElementById('interDT').value;
  const inwhere = document.getElementById('interDW').value;
  if(intable==''){
    let dataframe = document.getElementById('dataframe');
    let p = document.createElement('p');
    p.className = 'datalogout-fail datalogout';
    p.style = 'padding:10px 0px 10px 10px';
    p.appendChild(document.createTextNode('Some Field is Empty'));
    dataframe.appendChild(p);
    return;
  } else {
    let query = `DELETE FROM ${intable} ${(inwhere!='')?`WHERE ${inwhere}`:''}`;
    postQuery(query);
  }
}
// sql update
function sqlupdate(){
  const invalue = document.getElementById('interUV').value;
  const intable = document.getElementById('interUT').value;
  const inwhere = document.getElementById('interUW').value;
  if(invalue==''||intable==''){
    let dataframe = document.getElementById('dataframe');
    let p = document.createElement('p');
    p.className = 'datalogout-fail datalogout';
    p.style = 'padding:10px 0px 10px 10px';
    p.appendChild(document.createTextNode('Some Field is Empty'));
    dataframe.appendChild(p);
    return;
  } else {
    let query = `UPDATE ${intable} SET ${invalue} ${(inwhere!='')?`WHERE ${inwhere}`:''}`;
    postQuery(query);
  }
}
// sql insert
function sqlinsert(){
  const intable = document.getElementById('interIT').value;
  const invalue = document.getElementById('interIV').value;
  if(intable==''){
    let dataframe = document.getElementById('dataframe');
    let p = document.createElement('p');
    p.className = 'datalogout-fail datalogout';
    p.style = 'padding:10px 0px 10px 10px';
    p.appendChild(document.createTextNode('Some Field is Empty'));
    dataframe.appendChild(p);
    return;
  } else {
    let query = `INSERT INTO ${intable} VALUES ${invalue}`;
    postQuery(query);
  }
}

// utils
function postQuery(querytext) {
  fetch('/api/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `sql=${querytext}`,
  }).then(resp => resp.json())
  .then((resp) => {
    let dataframe = document.getElementById('dataframe');
    while(!!dataframe.lastElementChild){
      dataframe.removeChild(dataframe.lastElementChild);
    }
    if(!resp.error){
      console.log(resp);
      if(resp.data.length==0) {
        let p = document.createElement('p');
        p.className = 'datalogout-success datalogout';
        p.style = 'padding:10px 0px 10px 10px';
        p.appendChild(document.createTextNode('query success'));
        dataframe.appendChild(p);
        return;
      }
      let attr = Object.keys(resp.data[0]);
      resp.data.forEach(element => {
        // p element
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(`[Data]-${resp.data.indexOf(element)+1}`));
        // ul element
        let ul = document.createElement('ul');
        ul.className = 'datalogout-success datalogout';
        ul.appendChild(p);
        attr.forEach(a => {
          let logstr = a+' : '+element[a];
          let node = document.createElement('li');
          let child = document.createTextNode(logstr);
          node.appendChild(child);
          ul.appendChild(node);
        });
        dataframe.appendChild(ul);
      });
    } else {
      let p = document.createElement('p');
      p.className = 'datalogout-fail datalogout';
      p.style = 'padding:10px 0px 10px 10px';
      p.appendChild(document.createTextNode('Syntax Error'));
      dataframe.appendChild(p);
    }
  })
}
