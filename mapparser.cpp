#include <fstream>
#include <iostream>

#include "utils.cpp"

using namespace std;

struct lump_t {
    int   fileofs;    // offset into file (bytes)
    int   filelen;    // length of lump (bytes)
    int   version;    // lump format version
    char  fourCC[4];  // lump ident code
};

#define IDBSPHEADER (('P' << 24) + ('S' << 16) + ('B' << 8) + 'V') // VBSP
#define HEADER_LUMPS 64

struct dheader_t {
    int     ident = IDBSPHEADER;    // BSP file identifier
    int     version;                // BSP file version
    lump_t  lumps[HEADER_LUMPS];    // lump directory array
    int     mapRevision;            // the map's revision (iteration, version) number
};

struct Vector {
    float x;
    float y;
    float z;
};

struct dplane_t {
    Vector normal; // normal vector
    float dist;    // distance from origin
    int type;      // plane axis identifier
};

int main() {
    cout << COLOR_YELLOW << "[HL2toD3] Map parser" << endl;
    cout << COLOR_YELLOW << "Starting test..." << endl;
    cout << COLOR_RESET;

    dheader_t header;

    ifstream infile("testdata/background01.bsp", ifstream::binary | ifstream::in);
    /*  */ infile.read((char *)&header, sizeof(header));
    infile.close();

    cout << COLOR_CYAN;

    cout << "header.ident:\t\t"       << header.ident       << endl;
    cout << "header.version:\t\t"     << header.version     << endl;

    cout << "header.lumps[0]:"                              << endl;
    
    for(short i = 0; i < HEADER_LUMPS; i++) {
        cout << "\t\t\t" << i << ":" << endl;
        cout << "\t\t\t\tfileofs:\t\t" << header.lumps[i].fileofs << endl;
        cout << "\t\t\t\tfilelen:\t\t" << header.lumps[i].filelen << endl;
        cout << "\t\t\t\tversion:\t\t" << header.lumps[i].version << endl;
    }

    cout << "header.mapRevision:\t"   << header.mapRevision << endl;

    cout << COLOR_RESET;

    cout << COLOR_YELLOW << "Exit!" << COLOR_RESET << endl;

    return 0;
}