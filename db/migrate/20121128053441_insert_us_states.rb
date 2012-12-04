class InsertUsStates < ActiveRecord::Migration
  def up
    sql = "INSERT INTO us_states (name, code) VALUES ('Alabama' ,'AL')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Alaska' ,'AK')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Arizona' ,'AZ')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Arkansas' ,'AR')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('California' ,'CA')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Colorado' ,'CO')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Connecticut' ,'CT')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Delaware' ,'DE')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Florida' ,'FL')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Georgia' ,'GA')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Hawaii' ,'HI')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Idaho' ,'ID')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Illinois' ,'IL')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Indiana' ,'IN')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Iowa' ,'IA')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Kansas' ,'KS')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Kentucky' ,'KY')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Louisiana' ,'LA')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Maine' ,'ME')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Maryland' ,'MD')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Massachusetts' ,'MA')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Michigan' ,'MI')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Minnesota' ,'MN')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Mississippi' ,'MS')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Missouri' ,'MO')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Montana' ,'MT')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Nebraska' ,'NE')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Nevada' ,'NV')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('New Hampshire' ,'NH')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('New Jersey' ,'NJ')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('New Mexico' ,'NM')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('New York' ,'NY')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('North Carolina' ,'NC')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('North Dakota' ,'ND')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Ohio' ,'OH')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Oklahoma' ,'OK')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Oregon' ,'OR')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Pennsylvania' ,'PA')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Rhode Island' ,'RI')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('South Carolina' ,'SC')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('South Dakota' ,'SD')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Tennessee' ,'TN')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Texas' ,'TX')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Utah' ,'UT')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Vermont' ,'VT')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Virginia' ,'VA')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Washington' ,'WA')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('West Virginia' ,'WV')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Wisconsin' ,'WI')"
    execute sql
    sql = "INSERT INTO us_states (name, code) VALUES ('Wyoming' ,'WY')"
    execute sql
  end

  def down
    USStates.delete_all
  end
end
