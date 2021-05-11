package main

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"strconv"

	"github.com/AvraamMavridis/randomcolor"
	_ "github.com/AvraamMavridis/randomcolor"
	_ "github.com/godror/godror"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-oci8"
)

type Proc struct {
	Nombre string
}

type prueba struct {
	Id     int    `json:"id"`
	Nombre string `json:"nombre"`
}

type login struct {
	Username string `json:"username"`
	Contra   string `json:"contra"`
	Base     string `json:"base64"`
}

type Curso struct {
	Nombre      string `json:"nombre"`
	Descripcion string `json:"desc"`
	Auxiliar    string `json:"aux"`
}
type Imagen struct {
	Base string `json:"base64"`
}

type Usuario struct {
	Username          string `json:"username"`
	Contra            string `json:"contra"`
	Nombre            string `json:"nombre"`
	Apellido          string `json:"apellido"`
	Tier              int    `json:"tier"`
	Fecha_naciemiento string `json:"fecha_naciemiento"`
	Fecha_registro    string `json:"fecha_registro"`
	Correo            string `json:"correo"`
	Foto              string `json:"foto"`
	Base              string `json:"base64"`
}
type User struct {
	Username string `json:"username"`
}
type Retorno struct {
	Username          string `json:"username"`
	Contra            string `json:"contra"`
	Nombre            string `json:"nombre"`
	Apellido          string `json:"apellido"`
	Tier              int    `json:"tier"`
	Fecha_naciemiento string `json:"fecha_naciemiento"`
	Fecha_registro    string `json:"fecha_registro"`
	Correo            string `json:"correo"`
	Foto              string `json:"foto"`
	Base              string `json:"base"`
}
type update struct {
	Username          string `json:"username"`
	Contra            string `json:"contra"`
	Nombre            string `json:"nombre"`
	Apellido          string `json:"apellido"`
	Tier              int    `json:"tier"`
	Fecha_naciemiento string `json:"fecha_naciemiento"`
	Fecha_registro    string `json:"fecha_registro"`
	Correo            string `json:"correo"`
	Foto              string `json:"foto"`
	Base              string `json:"base64"`
}

type Lista struct {
	A struct {
		Nombre     string `yaml:"nombre"`
		Apellido   string `yaml:"apellido"`
		Password   string `yaml:"password"`
		Username   string `yaml:"username"`
		Resultados struct {
			Temporada string `yaml:"temporada"`
			Tier      string `yaml:"tier"`
			Jornadas  struct {
				Jornada      string `yaml:"jornada"`
				Predicciones struct {
					Deporte    string `yaml:"deporte"`
					Fecha      string `yaml:"fecha"`
					Visitante  string `yaml:"visitante"`
					Local      string `yaml:"local"`
					Prediccion struct {
						Visitante int64
						Local     int64
					} `yaml:"prediccion"`
					Resultado struct {
						Visitante int64
						Local     int64
					} `yaml:"resultado"`
				} `yaml:"Predicciones"`
			} `yaml:"Jornadas"`
		} `yaml:"resultados"`
	} `yaml:"A2"`
}

type Cpass struct {
	Username string `json:"username"`
	Correo   string `json:"correo"`
}

type passChage struct {
	Username string `json:"username"`
	Contra   string `json:"contra"`
}

type deporte struct {
	Nombre string `json:"nombre"`
	Color  string `json:"color"`
}

type depo struct {
	Nombre string `json:"nombre"`
}

type cant struct {
	Membresia string `json:"membresia"`
	Temporada string `json:"temporada"`
}

type ret2 struct {
	Cantidad int `json:"cantidad"`
}
type allDeporte []deporte

var userList = allDeporte{}

/*--------------------------carga masiva---------------*/
type Resultados struct {
	Temporada string    `json:"temporada"`
	Tier      string    `json:"tier"`
	Jornadas  []Jornada `Json:"jornadas"`
}

type Jornada struct {
	Jornada string   `json:"jornada"`
	Evento  []Evento `json:"predicciones"`
}

type Evento struct {
	Deporte    string     `json:"deporte"`
	Fecha      string     `json:"fecha"`
	Visitante  string     `json:"visitante"`
	Local      string     `json:"local"`
	Prediccion Prediccion `json:"prediccion"`
	Resultado  Resultado  `json:"resultado"`
}

type Prediccion struct {
	Visitante int `json:"visitante"`
	Local     int `json:"local"`
}

type Resultado struct {
	Visitante int `json:"visitante"`
	Local     int `json:"local"`
}

type Usuarios struct {
	Nombre     string       `yaml:"nombre"`
	Apellido   string       `yaml:"apellido"`
	Pass       string       `json:"password"`
	User       string       `json:"username"`
	Resultado_ []Resultados `json:"resultados"`
}

type Info map[string]Usuarios

func CrearImagen(w http.ResponseWriter, r *http.Request) {
	var img Imagen
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &img)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(img.Base))
	dec, err := base64.StdEncoding.DecodeString(img.Base)
	if err != nil {
		panic(err)
	}

	f, err := os.Create("imagenes/" + "admin")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	if _, err := f.Write(dec); err != nil {
		panic(err)
	}
	if err := f.Sync(); err != nil {
		panic(err)
	}

}
func Crear_Usuario(w http.ResponseWriter, r *http.Request) {

}

func pruebapost(w http.ResponseWriter, r *http.Request) {
	var pruebita Usuario
	reqBody, _ := ioutil.ReadAll(r.Body)

	json.Unmarshal(reqBody, &pruebita)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.WriteHeader(http.StatusOK)
	//w.Write([]byte(pruebita.Base)) //----devuelvo el username en el response del POST
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("insert into Usuario(username,contra,nombre,apellido,tiers,fecha_naciemiento,fecha_registro,correo,foto,tipo) values(:1, :2,:3,:4,:5,:6,:7,:8,:9,:10)", pruebita.Username, pruebita.Contra, pruebita.Nombre, pruebita.Apellido, pruebita.Tier, pruebita.Fecha_naciemiento, pruebita.Fecha_registro, pruebita.Correo, pruebita.Foto, 1)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

	w.Write([]byte(pruebita.Base))
	dec, err := base64.StdEncoding.DecodeString(pruebita.Base)
	if err != nil {
		panic(err)
	}
	f, err := os.Create("imagenes/" + pruebita.Username)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	if _, err := f.Write(dec); err != nil {
		panic(err)
	}
	if err := f.Sync(); err != nil {
		panic(err)
	}

}

func toBase64(b []byte) string {
	return base64.StdEncoding.EncodeToString(b)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var logu login
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &logu)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	var id string
	var pass string
	var foto string
	var err2 error
	err2 = db.QueryRow(" select username, contra,foto from Usuario where username = "+"'"+logu.Username+"'").Scan(&id, &pass, &foto)
	if err2 != nil {
		http.Error(w, err2.Error(), http.StatusInternalServerError)
		return
	}
	bytes, err := ioutil.ReadFile(foto)
	if err != nil {
		println("no se crea la imagen por que no hay")
		logu.Contra = pass
		logu.Base = ""
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(logu)
	} else {
		var base64Encoding string

		// Append the base64 encoded output
		base64Encoding += toBase64(bytes)

		// Print the full base64 representation of the image
		//fmt.Println("esto es la codificacion:" + base64Encoding)
		logu.Contra = pass
		logu.Base = base64Encoding
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(logu)

	}

}

func getUsers(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	rows2, err2 := db.Query("select nombre,contra from Usuario")
	if err2 != nil {
		log.Fatal("Error fetching user data\n", err2)
	}
	defer rows2.Close()

	for rows2.Next() {
		var nombre string
		var contra string
		rows2.Scan(&nombre, &contra)
		//fmt.Println("Usuario " + nombre + contra)
	}

}

func ObtenerUsuario(w http.ResponseWriter, r *http.Request) {
	var u User
	var ret Retorno
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &u)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	var id int
	var username string
	var pass string
	var name string
	var apellido string
	var tier int
	var fechaNac string
	var fechaReg string
	var correo string
	var foto string
	var tipo string
	var err2 error
	err2 = db.QueryRow(" select  *from Usuario where username = "+"'"+u.Username+"'").Scan(&id, &username, &pass, &name, &apellido, &tier, &fechaNac, &fechaReg, &correo, &foto, &tipo)

	if err2 != nil {
		http.Error(w, err2.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	ret.Username = username
	ret.Contra = pass
	ret.Nombre = name
	ret.Apellido = apellido
	ret.Tier = tier
	ret.Fecha_naciemiento = fechaNac
	ret.Fecha_registro = fechaReg
	ret.Correo = correo
	ret.Foto = foto
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ret)

}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var pruebita update
	reqBody, _ := ioutil.ReadAll(r.Body)

	json.Unmarshal(reqBody, &pruebita)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.WriteHeader(http.StatusOK)
	//w.Write([]byte(pruebita.Base)) //----devuelvo el username en el response del POST
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("update Usuario set username = '" + pruebita.Username + "', nombre = '" + pruebita.Nombre + "',apellido='" + pruebita.Apellido + "',fecha_naciemiento ='" + pruebita.Fecha_naciemiento + "',correo = '" + pruebita.Correo + "',foto='" + pruebita.Foto + "' where username ='" + pruebita.Username + "'")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())
	//w.Write([]byte(pruebita.Base))
	if pruebita.Base == "" {
		fmt.Println("NO se cambiara la foto")

	} else {
		dec, err := base64.StdEncoding.DecodeString(pruebita.Base)
		if err != nil {
			panic(err)
		}
		f, err := os.Create("imagenes/" + pruebita.Username)
		if err != nil {
			panic(err)
		}
		defer f.Close()

		if _, err := f.Write(dec); err != nil {
			panic(err)
		}
		if err := f.Sync(); err != nil {
			panic(err)
		}
	}

}

func EnviarEmail(body string, correo string) {
	from := "quinielaapparchivos@gmail.com"
	pass := "proyecto2archivos"
	to := correo

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: Hello there\n\n" +
		"ha  hecho una solicitud de un cambio de password " +
		"con el siguiente link " +
		body

	err := smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))

	if err != nil {
		log.Printf("smtp error: %s", err)
		return
	}

}

func CambiarPass(w http.ResponseWriter, r *http.Request) {
	var pruebita Cpass
	reqBody, _ := ioutil.ReadAll(r.Body)

	json.Unmarshal(reqBody, &pruebita)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("correo:" + pruebita.Correo))
	EnviarEmail(" http://localhost:3000/CambiarP", pruebita.Correo)

}

func Pass(w http.ResponseWriter, r *http.Request) {
	var pruebita passChage
	reqBody, _ := ioutil.ReadAll(r.Body)

	json.Unmarshal(reqBody, &pruebita)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.WriteHeader(http.StatusOK)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("update Usuario set contra = '" + pruebita.Contra + "' where username ='" + pruebita.Username + "'")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

}

func CargaMasiva(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var carga Info

	json.NewDecoder(r.Body).Decode(&carga)
	for _, element := range carga {
		var1 := element.User

		Insertar_Usuario(element.Nombre, element.Pass, element.User, element.Apellido)
		for _, element := range element.Resultado_ {
			temporada := element.Temporada
			insertar_temporada(element.Temporada)
			insertar_Membresia(var1, element.Tier, element.Temporada)
			for _, element := range element.Jornadas {
				jornada := element.Jornada
				insertar_Jornada(element.Jornada, temporada)
				for _, element := range element.Evento {
					var colorInHex string = randomcolor.GetRandomColorInHex()
					Insertar_deporte(element.Deporte, colorInHex)
					temp := retornar_Temporada(temporada)
					//fmt.Println("temporada: " + temp)
					evento := retornar_Evento(element.Local, element.Visitante, element.Fecha)
					Insertar_Evento(element.Local, element.Visitante, strconv.Itoa(element.Resultado.Local), strconv.Itoa(element.Resultado.Visitante), element.Fecha, element.Deporte, jornada, temp)
					Insertar_prediccion(strconv.Itoa(element.Prediccion.Local), strconv.Itoa(element.Prediccion.Visitante), var1, evento)

				}

			}
		}
	}

}

func Insertar_Usuario(nombre string, pass string, username string, apellido string) {
	//t := time.Now()
	//fecha := fmt.Sprintf("%d-%02d-%02dT",
	//t.Year(), t.Month(), t.Day())
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("insert into Usuario(username,contra,nombre,apellido,tiers,fecha_naciemiento,fecha_registro,correo,foto,tipo) values(:1, :2,:3,:4,:5,:6,:7,:8,:9,:10)", username, pass, nombre, apellido, 1, "1-1-1", "1-1-1", "", "imagenes/"+username, 1)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

}

func insertar_temporada(nombre string) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("insert into Temporada(nombre) values(:1)", nombre)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

}

func insertar_Membresia(usuario string, tipo string, temp string) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec(
		"INSERT INTO Temporada_Membresia (id_usuario, id_membresia, id_temporada)" +
			"VALUES (" +
			"(SELECT usuario.id_usuario from Usuario where Usuario.username = '" + usuario + "')," +
			"(SELECT membresia.id_membresia from Membresia where Membresia.nombre = '" + tipo + "')," +
			"(SELECT temporada.id_temporada from Temporada where Temporada.nombre = '" + temp + "')" +
			")")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

}

func insertar_Jornada(nombre string, temp string) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	rows2, err2 := db.Query("BEGIN insert_jornada('" + nombre + "', '" + temp + "');END;")

	if err2 != nil {
		fmt.Println(err2)
		return
	}
	defer rows2.Close()

}

func Insertar_deporte(nombre string, color string) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("insert into Deporte(nombre,color) values(:1, :2)", nombre, color)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

}
func Insertar_deporteM(w http.ResponseWriter, r *http.Request) {
	var dep depo
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &dep)
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	var colorInHex string = randomcolor.GetRandomColorInHex()
	res, err := db.Exec("insert into Deporte(nombre,color) values(:1, :2)", dep.Nombre, colorInHex)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

}

func Insertar_Evento(Elocal string, Evisitante string, Rlocal string, Rvisitante string, fecha string, deporte string, jornada string, temp string) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("BEGIN insert_evento('" + Elocal + "', '" + Evisitante + "', '" + Rlocal + "', '" + Rvisitante + "', '" + fecha + "', '" + deporte + "', '" + jornada + "', '" + temp + "');END;")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

}

func Insertar_prediccion(local string, visitante string, user string, evento string) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("BEGIN Insert_Prediccion('" + local + "', '" + visitante + "', '" + evento + "','" + user + "');END;")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

}

/*--------------PETICIONES GET----------------*/
func Mostrar_deporte(w http.ResponseWriter, r *http.Request) {
	var depor deporte
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer db.Close()

	rows2, err2 := db.Query("SELECT nombre,color from Deporte")
	if err2 != nil {
		fmt.Println(err2)
		return
	}
	defer rows2.Close()
	userList = allDeporte{}
	var depo string
	var color string
	//rows2.Scan(&color)
	//println("color" + color)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	for rows2.Next() {
		rows2.Scan(&depo, &color)
		depor.Nombre = depo
		depor.Color = color
		println("color" + color)
		userList = append(userList, depor)
	}
	json.NewEncoder(w).Encode(userList)
}

func Mostrar_Tiers(w http.ResponseWriter, r *http.Request) {
	var c cant
	var ret ret2
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &c)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	var cant int

	var err2 error
	err2 = db.QueryRow("select count(Usuario.id_usuario)  as Cantidad " +
		" from Usuario " +
		" inner join  Temporada_Membresia  on Usuario.id_usuario = Temporada_Membresia.id_usuario " +
		" inner join  Membresia on Temporada_Membresia.id_membresia = Membresia.id_membresia " +
		" inner join  Temporada on Temporada_Membresia.id_Temporada = Temporada.id_temporada " +
		" where Membresia.nombre = '" + c.Membresia + "' and  Temporada.nombre = '" + c.Temporada + "'").Scan(&cant)

	if err2 != nil {
		http.Error(w, err2.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	ret.Cantidad = cant
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ret)

}

/*---------------peticiones delete--------------*/
func delete_Deporte(w http.ResponseWriter, r *http.Request) {
	var d depo
	reqBody, _ := ioutil.ReadAll(r.Body)

	json.Unmarshal(reqBody, &d)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.WriteHeader(http.StatusOK)
	//w.Write([]byte(pruebita.Base)) //----devuelvo el username en el response del POST
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("delete from Deporte where  nombre = '" + d.Nombre + "'")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

}

func retornar_Temporada(nombreL string) (consulta string) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer db.Close()

	rows, err := db.Query("SELECT id_temporada FROM Temporada WHERE nombre = :1",
		nombreL)

	if err != nil {
		fmt.Println("retorno de evento")
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	defer rows.Close()

	var x int
	for rows.Next() {
		rows.Scan(&x)
		consulta = strconv.Itoa(x)
	}
	return consulta
}

func retornar_Evento(nombreL string, nombreV string, fecha string) (consulta string) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer db.Close()

	rows, err := db.Query("SELECT id_evento FROM Evento where Elocal = :1 and Evisitante = :2 and TO_CHAR(fecha,'DD/MM/YYYY HH24:MI') = :3",
		nombreL, nombreV, fecha)

	if err != nil {
		fmt.Println("retorno de evento")
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	defer rows.Close()

	var x int
	for rows.Next() {
		rows.Scan(&x)
		consulta = strconv.Itoa(x)
	}
	fmt.Println(strconv.Itoa(x))
	return consulta
}
func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/pruebapost", pruebapost).Methods("POST")
	router.HandleFunc("/getuser", getUsers).Methods("GET")
	router.HandleFunc("/login", Login).Methods("POST")
	router.HandleFunc("/carga", CargaMasiva).Methods("POST")
	router.HandleFunc("/image", CrearImagen).Methods("POST")
	router.HandleFunc("/obU", ObtenerUsuario).Methods("POST")
	router.HandleFunc("/update", UpdateUser).Methods("POST")
	router.HandleFunc("/Cpass", CambiarPass).Methods("POST")
	router.HandleFunc("/updatepass", Pass).Methods("POST")
	router.HandleFunc("/agregarDeporte", Insertar_deporteM).Methods("POST")
	router.HandleFunc("/eliminarDeporte", delete_Deporte).Methods("POST")
	router.HandleFunc("/getTier", Mostrar_Tiers).Methods("POST")
	router.HandleFunc("/getdeporte", Mostrar_deporte).Methods("POST")

	/*----------------gets-------*/

	fmt.Println("Esta funcionando")

	log.Fatal(http.ListenAndServe(":3030", router)) //log.fatal como que lo mantiene a la escucha y permite pararlo
}
