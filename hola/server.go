package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-oci8"
	"gopkg.in/yaml.v3"
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
}

type Curso struct {
	Nombre      string `json:"nombre"`
	Descripcion string `json:"desc"`
	Auxiliar    string `json:"aux"`
}

type Usuario struct {
	Username          string `json:"username"`
	Contra            string `json:"contra"`
	Nombre            string `json:"nombre"`
	Apellido          string `json:"apellido"`
	Tier              int    `json:"tier"`
	Fecha_naciemiento string `json:"fecha_nacimiento"`
	Fecha_registro    string `json:"fecha_registro"`
	Correo            string `json:"correo"`
	Foto              string `json:"foto"`
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

// to simulate a database
var Cursos []Curso

func Crear_Usuario(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	res, err := db.Exec("insert into Usuario(username,contra,nombre,apellido,tiers,fecha_naciemiento,fecha_registro,correo,foto) values(:1, :2,:3,:4,:5,:6,:7,:8,:9)", "Eduardo21", "caca1234", "Eduardo", "Tun", "gold", "10/10/10", "15/15/15", "eduardotun27565@gmail.com", "scasd")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

}

func pruebapost(w http.ResponseWriter, r *http.Request) {
	var pruebita Usuario
	//var loginprueba login
	// we will need to extract the `id` of the article we
	// wish to delete
	reqBody, _ := ioutil.ReadAll(r.Body)

	//---el body lo vuelvo un struct para acceder a sus atributos
	json.Unmarshal(reqBody, &pruebita)
	//println(pruebita.Username)
	//println(pruebita.Contra)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(pruebita.Username)) //----devuelvo el username en el response del POST
	fmt.Println("entro en el crear")
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("insert into Usuario(username,contra,nombre,apellido,tiers,fecha_naciemiento,fecha_registro,correo,foto,tipo) values(:1, :2,:3,:4,:5,:6,:7,:8,:9,:10)", pruebita.Username, pruebita.Contra, pruebita.Nombre, pruebita.Apellido, pruebita.Tier, pruebita.Fecha_naciemiento, pruebita.Fecha_registro, pruebita.Correo, "asdfs", 1)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

}

func Login(w http.ResponseWriter, r *http.Request) {
	var logu login
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &logu)

	//w.WriteHeader(http.StatusOK)
	//w.Write([]byte(logu.Username))

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	var id string
	var pass string
	var err2 error
	err2 = db.QueryRow(" select username, contra from Usuario where username = "+"'"+logu.Username+"'").Scan(&id, &pass)
	if err2 != nil {
		http.Error(w, err2.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(logu)
	/*println(id)
	println(pass)
	if id == "admin" {
		if pass == "admin" {
			var resp = map[string]interface{}{"message": "logged in"}
			json.NewEncoder(w).Encode(resp)
		} else {
			var resp = map[string]interface{}{"message": "Wrong Password"}
			json.NewEncoder(w).Encode(resp)

		}

	} else if id == logu.Username {
		if pass == logu.Contra {
			var resp = map[string]interface{}{"message": "logged in"}
			json.NewEncoder(w).Encode(resp)
		} else {
			var resp = map[string]interface{}{"message": "Wrong Password"}
			json.NewEncoder(w).Encode(resp)
		}

	} else {
		println("el usuario no existe")
		var resp = map[string]interface{}{"message": "USERNAME not found"}
		json.NewEncoder(w).Encode(resp)
	}*/
}

func pruebaget(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Endpoint Hit: Devuelvo todos los cursos")
	json.NewEncoder(w).Encode(Cursos)
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	fmt.Println("si entra en el metodo")

	rows2, err2 := db.Query("SELECT username from Usuario")
	if err2 != nil {
		log.Fatal("Error fetching user data\n", err)
	}
	defer rows2.Close()
	fmt.Println(rows2)

	for rows2.Next() {
		var nombre string
		rows2.Scan(&nombre)
		fmt.Println("Usuario " + nombre)
	}

}

func CargaMasiva(w http.ResponseWriter, r *http.Request) {

	var carga Lista
	reqBody, _ := ioutil.ReadAll(r.Body)

	yaml.Unmarshal(reqBody, &carga)
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("apellido: " + carga.A.Resultados.Temporada))

}
func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/createuser", Crear_Usuario).Methods("POST")
	router.HandleFunc("/pruebapost", pruebapost).Methods("POST")
	router.HandleFunc("/pruebaget", pruebaget).Methods("GET")
	router.HandleFunc("/getuser", getUsers).Methods("GET")
	router.HandleFunc("/login", Login).Methods("POST")
	router.HandleFunc("/carga", CargaMasiva).Methods("POST")
	fmt.Println("Esta funcionando")

	log.Fatal(http.ListenAndServe(":3030", router)) //log.fatal como que lo mantiene a la escucha y permite pararlo
}
