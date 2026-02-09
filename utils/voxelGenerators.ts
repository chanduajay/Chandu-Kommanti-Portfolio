
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { VoxelData } from '../types';
import { COLORS } from './voxelConstants';

function setBlock(map: Map<string, VoxelData>, x: number, y: number, z: number, color: number) {
    const rx = Math.round(x);
    const ry = Math.round(y);
    const rz = Math.round(z);
    const key = `${rx},${ry},${rz}`;
    map.set(key, { x: rx, y: ry, z: rz, color });
}

function generateSphere(map: Map<string, VoxelData>, cx: number, cy: number, cz: number, r: number, col: number, sy = 1) {
    const r2 = r * r;
    for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
        for (let y = Math.floor(cy - r * sy); y <= Math.ceil(cy + r * sy); y++) {
            for (let z = Math.floor(cz - r); z <= Math.ceil(cz + r); z++) {
                const dx = x - cx;
                const dy = (y - cy) / sy;
                const dz = z - cz;
                if (dx * dx + dy * dy + dz * dz <= r2) {
                    setBlock(map, x, y, z, col);
                }
            }
        }
    }
}

function generateBox(map: Map<string, VoxelData>, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, col: number) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            for (let z = Math.min(z1, z2); z <= Math.max(z1, z2); z++) {
                setBlock(map, x, y, z, col);
            }
        }
    }
}

export const Generators = {
    Avatar: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        const BY = 0;

        // --- LOWER BODY ---
        generateBox(map, -2.5, BY - 1, -1, -1, BY, 1.5, COLORS.SHOES);
        generateBox(map, 1, BY - 1, -1, 2.5, BY, 1.5, COLORS.SHOES);
        generateBox(map, -2, BY, -0.8, -1, BY + 9, 0.8, COLORS.TROUSERS);
        generateBox(map, 1, BY, -0.8, 2, BY + 9, 0.8, COLORS.TROUSERS);
        generateBox(map, -2, BY + 9, -0.8, 2, BY + 10, 0.8, COLORS.TROUSERS);

        // --- UPPER BODY ---
        generateBox(map, -2.5, BY + 10, -1, 2.5, BY + 18, 1, COLORS.SHIRT);
        generateBox(map, -3, BY + 10, -1.2, -1, BY + 18, 1.2, COLORS.BLAZER);
        generateBox(map, 1, BY + 10, -1.2, 3, BY + 18, 1.2, COLORS.BLAZER);
        generateBox(map, -1, BY + 10, -1.2, 1, BY + 18, -0.8, COLORS.BLAZER);
        
        for (let y = 10; y <= 16; y++) {
            const width = 1 + (y - 10) * 0.2;
            generateBox(map, -2.5, y, 1, -width, y, 1.2, COLORS.BLAZER);
            generateBox(map, width, y, 1, 2.5, y, 1.2, COLORS.BLAZER);
        }

        generateBox(map, -0.4, BY + 11, 1.1, 0.4, BY + 16, 1.3, COLORS.RED_TIE);
        setBlock(map, 0, BY + 17, 1.2, COLORS.RED_TIE);

        generateBox(map, -4, BY + 14, -0.8, -3, BY + 18, 0.8, COLORS.BLAZER);
        generateBox(map, 3, BY + 14, -0.8, 4, BY + 18, 0.8, COLORS.BLAZER);
        generateBox(map, -4.2, BY + 10, -0.8, -3.2, BY + 14, 0.8, COLORS.BLAZER);
        generateBox(map, 3.2, BY + 10, -0.8, 4.2, BY + 14, 0.8, COLORS.BLAZER);

        generateSphere(map, -3.7, BY + 9, 0, 1.2, COLORS.SKIN);
        generateSphere(map, 3.7, BY + 9, 0, 1.2, COLORS.SKIN);

        generateBox(map, -0.8, BY + 18, -0.5, 0.8, BY + 19, 0.5, COLORS.SKIN);
        generateSphere(map, 0, BY + 22, 0, 3.2, COLORS.SKIN, 1.1);

        setBlock(map, -1, BY + 23, 2.8, COLORS.BLACK);
        setBlock(map, 1, BY + 23, 2.8, COLORS.BLACK);

        generateSphere(map, 0, BY + 24.5, 0, 3.5, COLORS.BLACK, 0.8);
        generateBox(map, -3.2, BY + 21, -3, 3.2, BY + 25, -1, COLORS.BLACK);
        generateBox(map, -3.4, BY + 22, -1, -2.8, BY + 25, 1, COLORS.BLACK);
        generateBox(map, 2.8, BY + 22, -1, 3.4, BY + 25, 1, COLORS.BLACK);

        generateSphere(map, 0, BY - 5, 0, 10, COLORS.CYBER_BLUE, 0.15);
        generateSphere(map, 0, BY - 5.5, 0, 8, COLORS.NEON_PURPLE, 0.1);

        return Array.from(map.values());
    },

    About: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        generateBox(map, -8, 0, -6, 8, 1, 6, COLORS.WHITE);
        generateBox(map, -8.5, -0.5, -6.5, 8.5, 0.5, 6.5, COLORS.BLAZER);
        generateBox(map, -6, 1.2, -4, 0, 1.4, -3, COLORS.METAL);
        generateBox(map, -6, 1.2, -2, 2, 1.4, -1, COLORS.METAL);
        generateBox(map, -6, 1.2, 1, -2, 1.4, 2, COLORS.METAL);
        generateBox(map, 4, 1.2, 1, 6, 4, 4, COLORS.SKIN);
        return Array.from(map.values());
    },

    Skills: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        generateBox(map, -0.5, 0, -0.5, 0.5, 12, 0.5, COLORS.METAL);
        const nodes = [
            { x: -5, y: 14, z: 0, col: COLORS.CYBER_BLUE },
            { x: 5, y: 12, z: 0, col: COLORS.NEON_PURPLE },
            { x: 0, y: 16, z: 5, col: COLORS.GOLD_CERT },
            { x: 0, y: 8, z: -6, col: COLORS.GREEN }
        ];
        nodes.forEach(n => {
            generateSphere(map, n.x, n.y, n.z, 3.5, n.col);
            generateBox(map, 0, n.y, 0, n.x, n.y, n.z, COLORS.METAL);
        });
        return Array.from(map.values());
    },

    Education: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        generateBox(map, -6, 10, -6, 6, 10.5, 6, COLORS.BLACK);
        generateBox(map, -3, 6, -3, 3, 10, 3, COLORS.BLACK);
        generateBox(map, 6, 10, 0, 6.5, 4, 0.5, COLORS.GOLD_CERT);
        generateSphere(map, 0, 2, 0, 8, COLORS.WHITE, 0.1); 
        generateBox(map, -7, 1.5, -1, -6, 2.5, 1, COLORS.NEON_PURPLE);
        return Array.from(map.values());
    },

    Projects: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        generateSphere(map, -10, 8, 0, 4, COLORS.CYBER_BLUE);
        generateBox(map, -10.5, 0, -0.5, -9.5, 6, 0.5, COLORS.METAL);
        generateSphere(map, 0, 10, 0, 5, COLORS.NEON_PURPLE);
        generateBox(map, -0.5, 0, -0.5, 0.5, 8, 0.5, COLORS.METAL);
        generateBox(map, 8, 8, -2, 12, 12, 2, COLORS.GREEN);
        generateBox(map, 6, 9.5, -1.5, 14, 10.5, 1.5, COLORS.GREEN);
        generateBox(map, 9.5, 6, -1.5, 10.5, 14, 1.5, COLORS.GREEN);
        generateBox(map, 9.5, 0, -0.5, 10.5, 8, 0.5, COLORS.METAL);
        return Array.from(map.values());
    },

    Certifications: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        for (let i = 0; i < 3; i++) {
            const x = (i - 1) * 12;
            const y = 8 + (i % 2 === 0 ? 0 : 4);
            generateBox(map, x - 5, y - 4, 0, x + 5, y + 4, 1, COLORS.METAL);
            generateBox(map, x - 4.5, y - 3.5, 0.5, x + 4.5, y + 3.5, 1.2, COLORS.WHITE);
            generateSphere(map, x, y - 5, 0, 2, COLORS.GOLD_CERT);
        }
        return Array.from(map.values());
    },

    Achievements: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        generateBox(map, -4, 0, -4, 4, 2, 4, COLORS.METAL);
        generateBox(map, -3, 2, -3, 3, 4, 3, COLORS.METAL);
        generateBox(map, -2, 4, -2, 2, 6, 2, COLORS.METAL);
        generateSphere(map, 0, 12, 0, 5, COLORS.GOLD_CERT);
        generateBox(map, -1, 6, -1, 1, 9, 1, COLORS.GOLD_CERT);
        for(let i=0; i<5; i++) {
            generateSphere(map, (i-2)*6, 20, 0, 1.5, COLORS.GOLD);
        }
        return Array.from(map.values());
    },

    Contact: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        const BY = 0;

        // --- CYBER MAILBOX ---
        // Stand / Support
        generateBox(map, -1, BY - 10, -1, 1, BY + 2, 1, COLORS.METAL);
        generateBox(map, -3, BY - 10, -3, 3, BY - 8, 3, COLORS.BLAZER); // Base plate
        
        // Mailbox Body (Arch shape)
        // Main bottom
        generateBox(map, -5, BY + 2, -10, 5, BY + 3, 10, COLORS.BLAZER);
        // Sides
        generateBox(map, -5, BY + 3, -10, -4.5, BY + 10, 10, COLORS.BLAZER);
        generateBox(map, 4.5, BY + 3, -10, 5, BY + 10, 10, COLORS.BLAZER);
        // Arched Top
        for(let r = 0; r <= 5; r += 0.5) {
            const angle = (r / 5) * Math.PI;
            const ox = Math.cos(angle) * 5;
            const oy = Math.sin(angle) * 4 + 10;
            generateBox(map, ox - 0.5, BY + oy, -10, ox + 0.5, BY + oy + 1, 10, COLORS.BLAZER);
        }
        
        // Back panel
        generateBox(map, -5, BY + 3, -10, 5, BY + 14, -9.5, COLORS.BLAZER);

        // Front Door (Slightly Ajar)
        // Door panel
        generateBox(map, -5, BY + 3, 10, 5, BY + 14, 10.5, COLORS.METAL);
        // Handle
        generateBox(map, -0.5, BY + 11, 10.5, 0.5, BY + 13, 11, COLORS.GOLD_CERT);

        // Mailbox Flag (The "Up" Position)
        // Flag Pole
        generateBox(map, 5.2, BY + 6, 2, 5.5, BY + 18, 2.5, COLORS.RED_TIE);
        // Flag Plate
        generateBox(map, 5.2, BY + 15, 2.5, 5.5, BY + 19, 6, COLORS.RED_TIE);

        // Digital Signals / "Letters" floating out
        // Envelope 1
        generateBox(map, -2, BY + 18, 12, 2, BY + 21, 12.5, COLORS.WHITE);
        // Envelope 2 (Angled)
        generateBox(map, 4, BY + 22, 15, 8, BY + 25, 15.5, COLORS.CYBER_BLUE);
        // Data packets
        generateSphere(map, -6, BY + 24, 18, 1.5, COLORS.CYBER_BLUE);
        generateSphere(map, 2, BY + 28, 20, 1.2, COLORS.NEON_PURPLE);
        generateSphere(map, -3, BY + 32, 22, 0.8, COLORS.GOLD_CERT);

        return Array.from(map.values());
    }
};
