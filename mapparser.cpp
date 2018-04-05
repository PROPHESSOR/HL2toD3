#include <fstream>
#include <iostream>

#include "config.h"
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
    Vector  normal; // normal vector
    float   dist;    // distance from origin
    int     type;      // plane axis identifier
};

static dheader_t header;

void header_test() {
    cout << COLOR_YELLOW << "Starting test..." << endl;
    cout << COLOR_CYAN;

    cout << "header.ident:\t\t"       << header.ident       << endl;
    cout << "header.version:\t\t"     << header.version     << endl;
    cout << "header.mapRevision:\t"   << header.mapRevision << endl;

    cout << "header.lumps[]:"                               << endl;
    
    for(short i = 0; i < HEADER_LUMPS; i++) {
        lump_t lump = header.lumps[i];

        if(lump.fileofs == 0 && lump.filelen == 0) continue; // TODO: May be break?

        cout << "\t\t" << i << ":" << endl;
        cout << "\t\t\tfileofs:\t\t" << lump.fileofs << endl;
        cout << "\t\t\tfilelen:\t\t" << lump.filelen << endl;
        cout << "\t\t\tversion:\t\t" << lump.version << endl;
        cout << "\t\t\tfourCC[]:\t\t"                           << endl;

        for(short j = 0; j < 4; j++) {
            if(lump.fourCC[j] == 0) continue; // TODO: May be break?

            cout << "\t\t\t\t" << j << ":\t\t" << lump.fourCC[j] << "(" << (int) lump.fourCC[j] << ")" << endl;
        }
    }


    cout << COLOR_RESET;
}

int main() {
    cout << COLOR_YELLOW << "[HL2toD3] Map parser" << COLOR_RESET << endl;

    ifstream infile("testdata/background01.bsp", ifstream::binary | ifstream::in);
        infile.read((char *)&header, sizeof(header));
    infile.close();

    #ifdef D_SHOW_HEADER
        header_test();
    #endif

    cout << COLOR_YELLOW << "Exit!" << COLOR_RESET << endl;

    return 0;
}